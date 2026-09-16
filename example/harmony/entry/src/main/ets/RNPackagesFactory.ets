import type {RNPackageContext, RNPackage} from '@rnoh/react-native-openharmony/ts';

// react-native-toast-message 是纯 JS 库，没有原生模块，
// 这里无需注册任何 RNPackage。
export function createRNPackages(ctx: RNPackageContext): RNPackage[] {
  return [];
}
