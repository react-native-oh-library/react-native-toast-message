/**
 * Copyright (c) 2026 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/* eslint-env jest */

import { getTestId } from '../../../src/utils/test-id';

describe('getTestId', () => {
  it('prefixes the element name with the default "toast" prefix', () => {
    expect(getTestId('Text1')).toBe('toastText1');
  });

  it('uses the default prefix consistently for every element', () => {
    expect(getTestId('AnimatedContainer')).toBe('toastAnimatedContainer');
    expect(getTestId('TouchableContainer')).toBe('toastTouchableContainer');
    expect(getTestId('ContentContainer')).toBe('toastContentContainer');
  });

  it('uses the custom prefix when one is provided', () => {
    expect(getTestId('Text1', 'errorToast')).toBe('errorToastText1');
  });

  it('returns an empty string element name with the default prefix', () => {
    expect(getTestId('')).toBe('toast');
  });

  it('returns distinct ids for distinct element names', () => {
    expect(getTestId('Text1')).not.toBe(getTestId('Text2'));
  });

  it('does not insert a separator between prefix and element name', () => {
    expect(getTestId('Text1', 'toast_')).toBe('toast_Text1');
  });
});
