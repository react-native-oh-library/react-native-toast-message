> Document Template：v0.4.2

<p align="center">
  <h1 align="center"> <code>react-native-toast-message</code> </h1>
</p>

This project is based on [react-native-toast-message](https://github.com/calintamas/react-native-toast-message).

The version correspondence details are as follows:

| Name | Version(Npm Address) | Release Information | Supported RN Version | Supported Autolink | Compile API Version | Community Baseline Version | Source code address |
| --------------| -------------- | ------------------------------ | ------------- | ------------- |------------------------ | ------------ | ------------- |
| @react-native-ohos/react-native-toast-message | [~ 2.5.3](https://www.npmjs.com/package/@react-native-ohos/react-native-toast-message) | [Gitcode Releases](https://github.com/react-native-oh-library/react-native-toast-message/releases) | 0.84.* / 0.82.* / 0.77.* / 0.72.* | No | API12+ | 2.5.2 | [main](https://github.com/react-native-oh-library/react-native-toast-message/tree/main) |

## Introduction

An animated toast message component for React Native.

## Installation

Go to the project directory and execute the following instruction:

**npm**

```bash
npm install @react-native-ohos/react-native-toast-message
```

**yarn**

```bash
yarn add @react-native-ohos/react-native-toast-message
```

## Constraints

### Compatibility

This document is verified based on the following versions:

1. RNOH: 0.72.96; SDK: HarmonyOS 6.0.0 Release SDK; IDE: DevEco Studio 6.0.0.858; ROM: 6.0.0.112;
2. RNOH: 0.72.33; SDK: HarmonyOS NEXT B1; IDE: DevEco Studio: 5.0.3.900; ROM: Next.0.0.71;
3. RNOH: 0.77.18; SDK: HarmonyOS 6.0.0 Release SDK; IDE: DevEco Studio 6.0.0.858; ROM: 6.0.0.112;
4. RNOH: 0.82.1; SDK: HarmonyOS 6.0.1 Release SDK; IDE: DevEco Studio 6.0.1 Release; ROM:6.0.0.120 SP7;
5. RNOH: 0.84.1; SDK: HarmonyOS 6.0.1 Release SDK; IDE: DevEco Studio 6.0.1 Release; ROM:6.0.0.120 SP7;


## Example

The following code shows the basic use scenario of the repository:

> [!WARNING] The name of the imported repository remains unchanged.

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
      <Text style={styles.sectionTitle}>Toast Text</Text>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Input toast text1"
      />

      <Text style={styles.sectionTitle}>Built-in Presets (Top)</Text>
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

## Available APIs

> [!TIP] The **Platform** column indicates the platform where the properties are supported in the original third-party library.

> [!TIP] If the value of **HarmonyOS Support** is **yes**, it means that the OpenHarmony platform supports this property; **no** means the opposite; **partially** means some capabilities of this property are supported. The usage method is the same on different platforms and the effect is the same as that of iOS or Android.

### API
| Name   | Type | Parameter Type | Return Value | Required | Platform | OpenHarmony Platform Support | Description |
|--------|-------|----------|---------|-------|--------|-----|-----------------|
| show   | function | options = {}  | /   | No     | All | Yes   | Displays the toast. |
| hide   | function | /  | /   | No     | All | Yes   | Hides the toast. |


### Properties

#### Options of show

| Name            | Parameter Type          | Default Value     | Required           | Platform    | HarmonyOS Support | Description |
|-----------------|------------------|------------|---------------|---------|------------------|------|
| type            | string           | success    | No            | All     | Yes              | Toast type. Options: success, error, info. |
| text1           | string           | /          | No            | All     | Yes              | The first line of text.|
| text2           | string           | /          | No            | All     | Yes              | The second line of text.|
| position        | top or bottom    | top        | No            | All     | Yes              | Toast position. Options: top or bottom.|
| visibilityTime  | number           | 4000       | No            | All     | Yes              | The duration (in milliseconds) for which the toast is displayed before it is automatically hidden. Takes effect only when the autoHide property is set to true.   |
| autoHide        | boolean          | true       | No            | All     | Yes              | When set to true, the toast is automatically hidden after the number of milliseconds specified by visibilityTime.  |
| topOffset       | number           | 40         | No            | All     | Yes              | The offset (in pixels) between the toast and the top of the screen. Takes effect only when position is top.|
| bottomOffset    | number           | 40         | No            | All     | Yes              | The offset (in pixels) between the toast and the bottom of the screen. Takes effect only when position is bottom. |
| keyboardOffset  | number           | 10         | No            | iOS     | Yes              | The offset (in pixels) between the toast and the keyboard. Takes effect only when position is bottom and the keyboard is visible (iOS only). |
| onShow          | () => void       | /          | No            | All     | Yes               | Callback function fired when the toast is shown. |
| onHide          | () => void       | /          | No            | All     | Yes               | Callback function fired when the toast is hidden. |
| onPress         | () => void       | /          | No            | All     | Yes               | Callback function fired when the toast is pressed.|
| props           | any              | /          | No            | All     | Yes               | Any custom props passed to the specified toast type. Takes effect only when a custom toast type is configured via the config property of the Toast instance and that type uses the props parameter.|
| animationConfig | ToastAnimationConfig | { type: 'spring', friction: 8 }   | No   | All     | Yes       | Configures the enter/exit animation of the toast.|


#### Props of Toast

| Name            | Parameter Type          | Default Value     | Required           | Platform    | HarmonyOS Support | Description |
|-----------------|------------------|------------|---------------|---------|------------------|------|
| config            | 	ToastConfig  | /    | No            | All     | Yes              | Layout configuration for custom toast types. |
| type           | string           | /          | No            | All     | Yes              | Toast type. Options: success, error, info.|
| position        | top or bottom    | top        | No            | All     | Yes              | Toast position. Options: top or bottom.|
| visibilityTime  | number           | 4000       | No            | All     | Yes              | The duration (in milliseconds) for which the toast is displayed before it is automatically hidden. Takes effect only when the autoHide property is set to true.   |
| autoHide        | boolean          | true       | No            | All     | Yes              | When set to true, the toast is automatically hidden after the number of milliseconds specified by visibilityTime.  |
| swipeable       | boolean           | true         | No            | All     | Yes              | If true, the toast can be swiped to close.|
| topOffset    | number           | 40         | No            | All     | Yes              | The offset (in pixels) between the toast and the top of the screen. Takes effect only when position is top. |
| bottomOffset  | number           | 40         | No            | All     | Yes              | The offset (in pixels) between the toast and the bottom of the screen. Takes effect only when position is bottom. |
| keyboardOffset  | number           | 10         | No            | iOS     | Yes              | The offset (in pixels) between the toast and the keyboard. Takes effect only when position is bottom and the keyboard is visible (iOS only). |
| onShow          | () => void       | /          | No            | All     | Yes               | Callback function fired when the toast is shown. |
| onHide          | () => void       | /          | No            | All     | Yes               | Callback function fired when the toast is hidden. |
| onPress         | () => void       | /          | No            | All     | Yes               | Callback function fired when the toast is pressed.|
| animationConfig | ToastAnimationConfig | { type: 'spring', friction: 8 }   | No   | All     | Yes       | Configures the enter/exit animation of the toast.|


## Known Issues

None

## Other

None

## Directory Structure
````
/react-native-toast-message  # Project root directory
├─  index.ts           # Package entry: exports the Toast component and public APIs such as Toast.show/hide
├─  LICENSE
├─  package.json
├─  README.md          # Usage documentation
│
├─scripts              # Maintenance scripts
└─src                  # Main source code directory
    ├─  Toast.tsx      # Core component implementation
    ├─  ToastUI.tsx    # Pure presentation layer
    ├─  useToast.ts    # Core Hook
    │
    ├─components       # UI component layer
    ├─contexts         # React Context layer
    ├─hooks            # Custom Hooks
    ├─types            # TypeScript types
    ├─utils            # Utility functions
    ├─__helpers__      # Test helpers
    └─__tests__        # Test code
````

## How to Contribute

If you find any problem when using react-native-toast-message, submit an [Issue](https://github.com/calintamas/react-native-toast-message/issues). Of course, [PR](https://github.com/react-native-oh-library/react-native-toast-message/pulls) contributions are also warmly welcomed.

## License

This project is based on [MIT](https://github.com/calintamas/react-native-toast-message/blob/main/LICENSE). Please feel free to enjoy and participate in open source.
