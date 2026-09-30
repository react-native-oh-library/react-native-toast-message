/**
 * Copyright (c) 2026 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/* eslint-env jest */

/**
 * `src/utils/platform.ts` captures `Platform.OS` at import time, so each
 * OS value requires a fresh module load. Follows the same
 * `jest.doMock` + `jest.isolateModules` pattern as
 * `src/__tests__/harmony.test.ts`. The harmony row consolidates the
 * branch already asserted in that file for completeness of the
 * platform matrix.
 */

type PlatformModule = {
  isIOS: () => boolean;
  isHarmony: () => boolean;
};

const loadPlatformUtilsWithOS = (os: string): PlatformModule => {
  jest.resetModules();
  jest.doMock('react-native', () => ({
    Platform: { OS: os }
  }));

  let platformModule: PlatformModule | undefined;
  jest.isolateModules(() => {
    platformModule = jest.requireActual('../../../src/utils/platform') as {
      isIOS: () => boolean;
      isHarmony: () => boolean;
    };
  });
  return platformModule as PlatformModule;
};

afterEach(() => {
  jest.dontMock('react-native');
  jest.resetModules();
});

describe.each([
  ['ios', { isIOS: true, isHarmony: false }],
  ['android', { isIOS: false, isHarmony: false }],
  ['harmony', { isIOS: false, isHarmony: true }],
  ['windows', { isIOS: false, isHarmony: false }],
  ['macos', { isIOS: false, isHarmony: false }],
  ['web', { isIOS: false, isHarmony: false }]
])('platform predicates with Platform.OS = %s', (os, expected) => {
  it(`isIOS() returns ${expected.isIOS} and isHarmony() returns ${expected.isHarmony}`, () => {
    const { isIOS, isHarmony } = loadPlatformUtilsWithOS(os);

    expect(isIOS()).toBe(expected.isIOS);
    expect(isHarmony()).toBe(expected.isHarmony);
  });
});
