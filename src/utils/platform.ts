import { Platform } from 'react-native';

// widened to `string` so that `harmony` (React Native OpenHarmony) can be
// compared even though it's not part of the stock `PlatformOSType` union
const { OS }: { OS: string } = Platform;

export function isIOS() {
  return OS === 'ios';
}

export function isHarmony() {
  return OS === 'harmony';
}
