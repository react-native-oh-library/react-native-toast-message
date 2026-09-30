/**
 * Copyright (c) 2026 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/* eslint-env jest */

import { noop } from '../../../src/utils/func';

describe('noop', () => {
  it('is a function', () => {
    expect(typeof noop).toBe('function');
  });

  it('returns undefined', () => {
    expect(noop()).toBeUndefined();
  });

  it('ignores any arguments', () => {
    expect(noop(1, 'two', { three: 3 }, [4])).toBeUndefined();
  });

  it('is callable repeatedly without side effects', () => {
    expect(() => {
      noop();
      noop();
      noop();
    }).not.toThrow();
  });
});
