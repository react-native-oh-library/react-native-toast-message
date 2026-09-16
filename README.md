> 文档模板：v0.4.2

<p align="center">
  <h1 align="center"> <code>react-native-toast-message</code> </h1>
</p>

本项目基于 [react-native-toast-message](https://github.com/calintamas/react-native-toast-message) 开发。

版本所属关系如下：

| 三方库名称    | 三方库版本（npm地址）    | 发布信息     | 支持RN版本    | Autolink     | 编译API版本     | 社区基线版本    |  源码地址   |
| ------------ | ------------ | ------------------------------ | ------------- | ------------- |------------------------ | ------------- | ------------- | 
| @react-native-ohos/react-native-toast-message | [~ 2.5.3](https://www.npmjs.com/package/@react-native-ohos/react-native-toast-message)    | [Gitcode Releases](https://github.com/react-native-oh-library/react-native-toast-message/releases) | 0.84.* / 0.82.* / 0.77.* /0.72.* | 否 | API12+ | 2.5.2 | [main](https://github.com/react-native-oh-library/react-native-toast-message/tree/main) |

## 简介

适用于React Native的动画Toast消息组件。

## 下载安装

进入到工程目录并输入以下命令：

**npm**

```bash
npm install @react-native-ohos/react-native-toast-message
```

**yarn**

```bash
yarn add @react-native-ohos/react-native-toast-message
```

## 约束与限制

### 兼容性

本文档内容基于以下版本验证通过：

1. RNOH: 0.72.96; SDK: HarmonyOS 6.0.0 Release SDK; IDE: DevEco Studio 6.0.0.858; ROM: 6.0.0.112;
2. RNOH: 0.72.33; SDK: HarmonyOS NEXT B1; IDE: DevEco Studio: 5.0.3.900; ROM: Next.0.0.71;
3. RNOH: 0.77.18; SDK: HarmonyOS 6.0.0 Release SDK; IDE: DevEco Studio 6.0.0.858; ROM: 6.0.0.112;
4. RNOH: 0.82.1; SDK: HarmonyOS 6.0.1 Release SDK; IDE: DevEco Studio 6.0.1 Release; ROM:6.0.0.120 SP7;
5. RNOH: 0.84.1; SDK: HarmonyOS 6.0.1 Release SDK; IDE: DevEco Studio 6.0.1 Release; ROM:6.0.0.120 SP7;

  
 ## 使用示例
下面的代码展示了这个库的基本使用场景：

> [!WARNING] 使用时 import 的库名不变。

```javascript
import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';
import Toast, {ToastShowParams} from 'react-native-toast-message';

export default function BasicUsageExample() {
  const [message, setMessage] = useState('Hello from HarmonyOS');

  const showToast = (
    type: 'success' | 'error' | 'info',
    extra?: Partial<ToastShowParams>
  ) => {
    Toast.show({
      type,
      text1: message,
      text2: `type: ${type}`,
      ...extra
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled">
      <Text style={styles.sectionTitle}>Toast 文案</Text>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Input toast text1"
      />

      <Text style={styles.sectionTitle}>内置预设（顶部）</Text>
      <View style={styles.row}>
        <Button label="Success" onPress={() => showToast('success')} />
        <Button label="Error" onPress={() => showToast('error')} />
        <Button label="Info" onPress={() => showToast('info')} />
      </View>

      <Toast />
    </ScrollView>
  );
}

function Button({
  label,
  onPress
}: {
  label: string;
  onPress: () => void;
}) {
  return (
    <TouchableHighlight
      style={styles.button}
      underlayColor="#d0d0d0"
      onPress={onPress}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  content: {
    padding: 16
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginTop: 16,
    marginBottom: 8
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  button: {
    backgroundColor: '#eeeeee',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 8
  },
  buttonText: {
    fontSize: 13,
    color: '#2883d2'
  }
});
```

## 接口说明

> [!TIP] "Platform"列表示该属性在原三方库上支持的平台。

> [!TIP] "OpenHarmony Support"列为 yes 表示 OpenHarmony平台支持 该属性；no 则表示不支持；partially 表示部分支持。使用方法跨平台一致，效果对标 iOS 或 Android 的效果。

### API
| 名称     | 类型     | 参数类型 | 返回值 | 必填    | 平台 | OpenHarmony平台支持 | 描述  |
|--------|---------|-----|-------|-------|--------|-----|-----------------|
| show   | function | options = {}  | /   | No     | All | Yes   | 展示toast。 |
| hide  | function | /  | /   | No     | All | Yes   | 隐藏toast。 |


### 属性

#### show 的 options

| 名称            | 参数类型          | 默认值     | 必填           | 平台    | HarmonyOS平台支持 | 描述 |
|-----------------|------------------|------------|---------------|---------|------------------|------|
| type            | string           | success    | No            | All     | Yes              | toast类型，可选：success, error, info。 |
| text1           | string           | /          | No            | All     | Yes              | 第一行文本。|
| text2           | string           | /          | No            | All     | Yes              | 第二行文本。|
| position        | top or bottom    | top        | No            | All     | Yes              | toast位置，可选 top 或 bottom）|
| visibilityTime  | number           | 4000       | No            | All     | Yes              | toast自动隐藏前的显示时长（单位：毫秒），仅在 autoHide 属性设为 true 时生效。   |
| autoHide        | boolean          | true       | No            | All     | Yes              | 设为 true 时，toast会在 visibilityTime 指定的毫秒数后自动隐藏。  |
| topOffset       | number           | 40         | No            | All     | Yes              | toast距离屏幕顶部的偏移量（单位：像素），仅当 position 为 top 时生效。|
| bottomOffset    | number           | 40         | No            | All     | Yes              | toast距离屏幕底部的偏移量（单位：像素），仅当 position 为 bottom 时生效。 |
| keyboardOffset  | number           | 10         | No            | IOS     | Yes              | toast距离键盘的偏移量（单位：像素），仅当 position 为 bottom 且键盘处于显示状态时生效（仅支持 iOS 系统） |
| onShow          | () => void       | /          | No            | All     | Yes               | toast显示时触发的回调函数。 |
| onHide          | () => void       | /          | No            | All     | Yes               |toast隐藏时触发的回调函数 |
| onPress         | () => void       | /          | No            | All     | Yes               | 点击toast时触发的回调函数。|
| props           | any              | /          | No            | All     | Yes               | 传递给指定toast类型的任意自定义属性，仅当存在通过 Toast 实例的 config 属性配置的自定义toast类型且该类型使用 props 参数时生效。|
| animationConfig | ToastAnimationConfig | { type: 'spring', friction: 8 }   | No   | All     | Yes       | 配置toast的入场/退场动画。|


#### Toast的属性

| 名称            | 参数类型          | 默认值     | 必填           | 平台    | HarmonyOS平台支持 | 描述 |
|-----------------|------------------|------------|---------------|---------|------------------|------|
| config            | 	ToastConfig  | /    | No            | All     | Yes              | 自定义Toast类型的布局配置。 |
| type           | string           | /          | No            | All     | Yes              | toast类型，可选：success, error, info。|
| position        | top or bottom    | top        | No            | All     | Yes              | toast位置，可选 top 或 bottom）|
| visibilityTime  | number           | 4000       | No            | All     | Yes              | toast自动隐藏前的显示时长（单位：毫秒），仅在 autoHide 属性设为 true 时生效。   |
| autoHide        | boolean          | true       | No            | All     | Yes              | 设为 true 时，toast会在 visibilityTime 指定的毫秒数后自动隐藏。  |
| swipeable       | boolean           | true         | No            | All     | Yes              | 如果为true，可以滑动Toast以关闭|
| topOffset    | number           | 40         | No            | All     | Yes              | toast距离屏幕顶部的偏移量（单位：像素），仅当 position 为 top 时生效。 |
| bottomOffset  | number           | 40         | No            | All     | Yes              | toast距离屏幕底部的偏移量（单位：像素），仅当 position 为 bottom 时生效。 |
| keyboardOffset  | number           | 10         | No            | IOS     | Yes              | toast距离键盘的偏移量（单位：像素），仅当 position 为 bottom 且键盘处于显示状态时生效（仅支持 iOS 系统） |
| onShow          | () => void       | /          | No            | All     | Yes               | toast显示时触发的回调函数。 |
| onHide          | () => void       | /          | No            | All     | Yes               |toast隐藏时触发的回调函数 |
| onPress         | () => void       | /          | No            | All     | Yes               | 点击toast时触发的回调函数。|
| animationConfig | ToastAnimationConfig | { type: 'spring', friction: 8 }   | No   | All     | Yes       | 配置toast的入场/退场动画。|


## 遗留问题
无

## 其他
无
  
## 目录结构
````
/react-native-toast-message  # 项目根目录
├─  index.ts           # 包入口:导出 Toast 组件及 Toast.show/hide 等公开 API
├─  LICENSE 
├─  package.json  
├─  README.md          # 使用文档
│
├─scripts              # 维护脚本
└─src                  # 源码主目录
    ├─  Toast.tsx      # 核心组件实现
    ├─  ToastUI.tsx    # 纯展示层
    ├─  useToast.ts    # 核心 Hook
    │
    ├─components       # UI 组件层
    ├─contexts         # React Context 层
    ├─hooks            # 自定义 Hooks
    ├─types            # TypeScript 类型
    ├─utils            # 工具函数
    ├─__helpers__      # 测试辅助
    └─__tests__        # 测试代码                   
````
  
## 贡献代码

使用过程中发现任何问题都可以提交 [Issue](https://github.com/calintamas/react-native-toast-message/issues)，当然，也非常欢迎提交 [PR](https://github.com/react-native-oh-library/react-native-toast-message/pulls) 。
  
## 开源协议

本项目基于 [MIT](https://github.com/calintamas/react-native-toast-message/blob/main/LICENSE) ，请自由地享受和参与开源。