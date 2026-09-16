/* eslint-env jest */

/**
 * Verifies the harmony (React Native OpenHarmony) branches introduced by the
 * harmony adaptation. Each test re-loads the modules under test with
 * `Platform.OS` mocked as `'harmony'` via `jest.doMock`, following the same
 * pattern as `BaseToast.styles.test.ts`.
 */

type KeyboardListener = (event: unknown) => void;

type MockKeyboard = {
  addListener: jest.Mock;
};

const createMockKeyboard = () => {
  const listeners: Record<string, KeyboardListener> = {};
  const keyboard: MockKeyboard = {
    addListener: jest.fn((event: string, handler: KeyboardListener) => {
      listeners[event] = handler;
      return { remove: jest.fn() };
    })
  };
  return {
    keyboard,
    emit: (event: string, payload?: unknown) => {
      listeners[event](payload);
    }
  };
};

const loadWithHarmonyOS = (
  reactNativeMock: Record<string, unknown>,
  load: () => void
) => {
  jest.resetModules();
  jest.doMock('react-native', () => ({
    Platform: { OS: 'harmony' },
    ...reactNativeMock
  }));
  jest.isolateModules(load);
};

afterEach(() => {
  jest.dontMock('react-native');
  jest.resetModules();
});

describe('harmony branch behavior (Platform.OS === "harmony")', () => {
  it('isHarmony() returns true and isIOS() returns false', () => {
    loadWithHarmonyOS({}, () => {
      const { isHarmony, isIOS } = require('../utils/platform') as {
        isHarmony: () => boolean;
        isIOS: () => boolean;
      };

      expect(isHarmony()).toBe(true);
      expect(isIOS()).toBe(false);
    });
  });

  it('useKeyboard registers keyboardDidShow/keyboardDidHide listeners', () => {
    const { keyboard, emit } = createMockKeyboard();

    loadWithHarmonyOS({ Keyboard: keyboard }, () => {
      // /pure entry point: no automatic afterEach registration, safe to
      // require inside a running test (jest-circus forbids that otherwise)
      const { act, renderHook } = require('@testing-library/react-hooks/pure');
      const { useKeyboard } = require('../hooks/useKeyboard') as {
        useKeyboard: () => { keyboardHeight: number; isKeyboardVisible: boolean };
      };

      const { result } = renderHook(useKeyboard);

      expect(keyboard.addListener).toHaveBeenCalledTimes(2);
      expect(keyboard.addListener).toHaveBeenCalledWith(
        'keyboardDidShow',
        expect.any(Function)
      );
      expect(keyboard.addListener).toHaveBeenCalledWith(
        'keyboardDidHide',
        expect.any(Function)
      );

      act(() => {
        emit('keyboardDidShow', { endCoordinates: { height: 301 } });
      });
      expect(result.current.keyboardHeight).toBe(301);
      expect(result.current.isKeyboardVisible).toBe(true);

      act(() => {
        emit('keyboardDidHide');
      });
      expect(result.current.keyboardHeight).toBe(0);
      expect(result.current.isKeyboardVisible).toBe(false);
    });
  });

  it('useSlideAnimation passes useNativeDriver: false to Animated animations', () => {
    const { keyboard } = createMockKeyboard();
    const animationMock = () => ({ start: jest.fn() });
    const spring = jest.fn(animationMock);
    const timing = jest.fn(animationMock);

    loadWithHarmonyOS(
      {
        Keyboard: keyboard,
        Animated: {
          Value: class MockValue {
            value: number;
            constructor(value: number) {
              this.value = value;
            }
            interpolate = jest.fn(() => ({}));
          },
          spring,
          timing
        }
      },
      () => {
        const { renderHook } = require('@testing-library/react-hooks/pure');
        const { useSlideAnimation } = require('../hooks/useSlideAnimation') as {
          useSlideAnimation: (params: Record<string, unknown>) => {
            animate: (toValue: number) => void;
          };
        };

        const defaultParams = {
          topOffset: 40,
          bottomOffset: 60,
          keyboardOffset: 5,
          avoidKeyboard: true
        };

        // default (spring) animation
        const { result } = renderHook(() =>
          useSlideAnimation({ position: 'top', height: 20, ...defaultParams })
        );
        result.current.animate(1);
        expect(spring).toHaveBeenCalledTimes(1);
        expect(spring.mock.calls[0][1]).toEqual(
          expect.objectContaining({ toValue: 1, useNativeDriver: false })
        );

        result.current.animate(0);
        expect(spring).toHaveBeenCalledTimes(2);
        expect(spring.mock.calls[1][1]).toEqual(
          expect.objectContaining({ toValue: 0, useNativeDriver: false })
        );
        expect(timing).not.toHaveBeenCalled();

        // explicit timing animationConfig also gets useNativeDriver: false
        const { result: timingResult } = renderHook(() =>
          useSlideAnimation({
            position: 'top',
            height: 20,
            ...defaultParams,
            animationConfig: { type: 'timing', duration: 200 }
          })
        );
        timingResult.current.animate(1);
        expect(timing).toHaveBeenCalledTimes(1);
        expect(timing.mock.calls[0][1]).toEqual(
          expect.objectContaining({ toValue: 1, useNativeDriver: false })
        );
      }
    );
  });

  it('BaseToast.styles shadow branch resolves to nativeShadowStyle', () => {
    const select = jest.fn(
      (options: Record<string, unknown>) => options.default
    );

    loadWithHarmonyOS(
      {
        Platform: { OS: 'harmony', select },
        StyleSheet: {
          create: <T,>(styles: T) => styles
        }
      },
      () => {
        const { styles, BORDER_RADIUS } = require('../components/BaseToast.styles') as {
          styles: { base: Record<string, unknown> };
          BORDER_RADIUS: number;
        };

        const baseStyle = styles.base;

        // takes the native shadow props (nativeShadowStyle), not the web branch
        expect(baseStyle).toMatchObject({
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.1,
          shadowRadius: BORDER_RADIUS,
          elevation: 2
        });
        expect(baseStyle).not.toHaveProperty('boxShadow');

        // the harmony ternary short-circuits: Platform.select is never consulted
        expect(select).not.toHaveBeenCalled();
      }
    );
  });
});
