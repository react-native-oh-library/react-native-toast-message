import { Platform, StyleSheet, ViewStyle } from 'react-native';

import { isHarmony } from '../utils/platform';

export const HEIGHT = 60;
export const WIDTH = 340;
export const BORDER_RADIUS = 6;

type ShadowStyle =
  | { boxShadow: string }
  | Pick<ViewStyle, 'shadowOffset' | 'shadowOpacity' | 'shadowRadius'>;

const nativeShadowStyle: ShadowStyle = {
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.1,
  shadowRadius: BORDER_RADIUS
};

const shadowStyle = isHarmony()
  ? nativeShadowStyle
  : Platform.select<ShadowStyle>({
      web: {
        boxShadow: `0px 0px ${BORDER_RADIUS}px rgba(0, 0, 0, 0.1)`
      },
      default: nativeShadowStyle
    });

export const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    height: HEIGHT,
    width: WIDTH,
    borderRadius: BORDER_RADIUS,
    ...shadowStyle,
    elevation: 2,
    backgroundColor: '#FFF'
  },
  leadingBorder: {
    borderLeftWidth: 5,
    borderLeftColor: '#D8D8D8'
  },
  contentContainer: {
    paddingHorizontal: 25,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start' // In case of RTL, the text will start from the right
  },
  text1: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#000',
    width: '100%' // Fixes: https://github.com/calintamas/react-native-toast-message/issues/130
  },
  text2: {
    fontSize: 10,
    color: '#979797',
    width: '100%' // Fixes: https://github.com/calintamas/react-native-toast-message/issues/130
  }
});
