/**
 * Copyright (c) 2026 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Dedicated Jest config for the white-box test suite stored under
 * `jest/` (see jest/README.md). Kept separate from the root config so
 * the co-located per-directory suites in src and this central suite can
 * be run and measured independently:
 *
 *   yarn test:jest
 */

const rnPreset = require('react-native/jest-preset');

/** @type {import('jest').Config} */
module.exports = {
  ...rnPreset,
  rootDir: '..',
  testEnvironment: 'node',
  // precise matching: only the central jest/ suite, never upstream tests
  testMatch: ['<rootDir>/jest/__tests__/**/*.test.{ts,tsx}'],
  testPathIgnorePatterns: ['/node_modules/', '/__helpers__/'],
  setupFiles: ['<rootDir>/scripts/node-patch.js', ...rnPreset.setupFiles],
  setupFilesAfterEnv: ['<rootDir>/jest/jest.setup.js'],
  globals: {
    __DEV__: true
  },
  collectCoverage: true,
  // white-box focus: modules of `src/` that have no co-located suite yet.
  // Note: index.ts (pure re-export barrel) is intentionally not listed —
  // istanbul has no measurable statements for it; the API surface is
  // guarded by __tests__/exports.test.ts instead.
  collectCoverageFrom: [
    'src/components/AnimatedContainer.styles.tsx',
    'src/utils/array.ts',
    'src/utils/func.ts',
    'src/utils/platform.ts',
    'src/utils/test-id.ts'
  ],
  coverageThreshold: {
    global: { branches: 60 }
  }
};
