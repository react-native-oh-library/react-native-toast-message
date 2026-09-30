/**
 * Copyright (c) 2026 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/* eslint-env jest */

/**
 * White-box coverage for `src/components/AnimatedContainer.styles.tsx`,
 * which has no Platform-dependent branches — the stylesheet is a static
 * shape contract consumed by `AnimatedContainer.tsx`.
 */

type AnimatedContainerStyles = {
  base: Record<string, unknown>;
  top: Record<string, unknown>;
  bottom: Record<string, unknown>;
};

const loadStyles = (): AnimatedContainerStyles => {
  jest.resetModules();
  jest.doMock('react-native', () => ({
    StyleSheet: {
      create: (styles: AnimatedContainerStyles) => styles
    }
  }));

  let styles: AnimatedContainerStyles | undefined;
  jest.isolateModules(() => {
    const module = jest.requireActual(
      '../../../src/components/AnimatedContainer.styles'
    ) as { styles: AnimatedContainerStyles };
    styles = module.styles;
  });
  return styles as AnimatedContainerStyles;
};

afterEach(() => {
  jest.dontMock('react-native');
  jest.resetModules();
});

describe('AnimatedContainer.styles', () => {
  it('base style stretches full width and centers children', () => {
    const { base } = loadStyles();

    expect(base).toEqual({
      position: 'absolute',
      left: 0,
      right: 0,
      alignItems: 'center',
      justifyContent: 'center'
    });
  });

  it('top style pins the container to the top edge', () => {
    const { top } = loadStyles();

    expect(top).toEqual({ top: 0 });
  });

  it('bottom style pins the container to the bottom edge', () => {
    const { bottom } = loadStyles();

    expect(bottom).toEqual({ bottom: 0 });
  });

  it('exposes exactly base, top and bottom styles', () => {
    const styles = loadStyles();

    expect(Object.keys(styles).sort()).toEqual(['base', 'bottom', 'top']);
  });
});
