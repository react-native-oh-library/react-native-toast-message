# Jest — JS 白盒单元测试

集中存放不依赖鸿蒙设备的 JS 白盒单元测试，约定遵循
[rnoh-js-test skill](https://gitcode.com/CPF-RN/ohos_react_native/blob/d2aa0f8cf43172d29a6768de3b0519180922bb70/.agents/skills/rnoh-js-test/SKILL.md)
（testMatch 精确匹配、license header、`__DEV__` 全局、coverage threshold）。

## 运行

```bash
# 仅运行本目录套件（含覆盖率 + branches ≥ 60% 阈值）
yarn test:jest

# 只跑匹配的测试文件
yarn test:jest --testPathPattern "utils"

# 根目录 `yarn test` 也会拾取本目录（react-native jest-preset 默认 testMatch）
yarn test
```

## 目录结构

```
jest/
├── jest.config.js                    # 专用配置（rootDir 指向工程根）
├── jest.setup.js                     # 全局 mock（NativeAnimatedHelper、queueMicrotask 兜底）
└── __tests__/                        # 测试目录，镜像 src/ 结构
    ├── exports.test.ts               # 包入口 index.ts 公共 API 面
    ├── components/
    │   └── AnimatedContainer.styles.test.ts
    └── utils/
        ├── array.test.ts             # additiveInverseArray
        ├── func.test.ts              # noop
        ├── platform.test.ts          # isIOS / isHarmony 全平台矩阵
        └── test-id.test.ts           # getTestId
```

## 约定

- 覆盖范围：`collectCoverageFrom` 只统计 `src/` 中**尚无同目录 `__tests__` 覆盖**的模块；
  与源码同目录的存量测试（`src/**/__tests__`）不在本套件职责内。
- `Platform.OS` 在 import 时被捕获，测平台分支须用 `jest.doMock` +
  `jest.isolateModules` 重新加载模块（参见 `utils/platform.test.ts`、
  `src/__tests__/harmony.test.ts` 中的既有模式）。
- 新增 `.js/.ts` 文件需带 MIT license header。

## 铁律（来自 rnoh-js-test skill）

- **C0**：不得修改 `src/` 下的任何生产源码；mock、fixture 只放在本目录。
- **C4**：写测试前先确认源文件在当前工程中的实际路径。
