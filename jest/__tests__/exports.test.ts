/**
 * Copyright (c) 2026 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/* eslint-env jest */

/**
 * Guards the public API surface declared by the package entry point
 * (`index.ts`): the default Toast component and the preset toast
 * components. A breaking change to the export surface fails here
 * before it reaches consumers.
 */

import Toast, {
  BaseToast,
  ErrorToast,
  InfoToast,
  SuccessToast
} from '../../index';

describe('package export surface (index.ts)', () => {
  it('exports the Toast component as default', () => {
    expect(typeof Toast).toBe('function');
  });

  it('exports the preset toast components', () => {
    expect(typeof BaseToast).toBe('function');
    expect(typeof SuccessToast).toBe('function');
    expect(typeof ErrorToast).toBe('function');
    expect(typeof InfoToast).toBe('function');
  });

  it('exports distinct preset components', () => {
    const presets = new Set([BaseToast, SuccessToast, ErrorToast, InfoToast]);
    expect(presets.size).toBe(4);
  });

  it('exposes the imperative API on the default export', () => {
    expect(typeof Toast.show).toBe('function');
    expect(typeof Toast.hide).toBe('function');
  });

  it('exposes no undeclared imperative API', () => {
    expect(
      Object.keys(Toast as unknown as Record<string, unknown>).sort()
    ).toEqual(['hide', 'show']);
  });
});
