/**
 * Copyright (c) 2026 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/* eslint-env jest */

import { additiveInverseArray } from '../../../src/utils/array';

describe('additiveInverseArray', () => {
  it('maps every element to its additive inverse', () => {
    expect(additiveInverseArray([1, 2, 3])).toEqual([-1, -2, -3]);
  });

  it('returns an empty array for an empty input', () => {
    expect(additiveInverseArray([])).toEqual([]);
  });

  it('maps zero to negative zero (its IEEE 754 additive inverse)', () => {
    const result = additiveInverseArray([0, 0]);
    expect(Object.is(result[0], -0)).toBe(true);
    expect(Object.is(result[1], -0)).toBe(true);
  });

  it('inverts negative values into positive ones', () => {
    expect(additiveInverseArray([-4, -0.5])).toEqual([4, 0.5]);
  });

  it('handles mixed integers, negatives and floats', () => {
    expect(additiveInverseArray([1, -1, 2.5])).toEqual([-1, 1, -2.5]);
  });

  it('does not mutate the input array', () => {
    const input = [1, -2, 3];
    additiveInverseArray(input);
    expect(input).toEqual([1, -2, 3]);
  });
});
