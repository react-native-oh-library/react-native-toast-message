/**
 * Copyright (c) 2026 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/* eslint-env jest */

// Animated's native driver helper must be mocked so that animations with
// `useNativeDriver` can be created in the Jest node environment.
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// fallback for Node versions where queueMicrotask is missing
if (typeof global.queueMicrotask === 'undefined') {
  global.queueMicrotask = function queueMicrotaskShim(callback) {
    return Promise.resolve().then(callback);
  };
}
