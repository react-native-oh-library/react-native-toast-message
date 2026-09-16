/**
 * 基础用法 demo — 内置 success / error / info 预设 + 常用 props。
 * 入口：App demo list -> "Toast Basic Usage"
 */
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

      <Text style={styles.sectionTitle}>位置与偏移</Text>
      <View style={styles.row}>
        <Button
          label="Bottom"
          onPress={() =>
            showToast('info', {
              position: 'bottom',
              bottomOffset: 80
            })
          }
        />
        <Button
          label="Top offset 120"
          onPress={() => showToast('success', {topOffset: 120})}
        />
      </View>

      <Text style={styles.sectionTitle}>自动隐藏 / 手动隐藏</Text>
      <View style={styles.row}>
        <Button
          label="Sticky (autoHide: false)"
          onPress={() =>
            showToast('error', {autoHide: false, swipeable: true})
          }
        />
        <Button label="Toast.hide()" onPress={() => Toast.hide()} />
      </View>

      <Text style={styles.sectionTitle}>回调</Text>
      <View style={styles.row}>
        <Button
          label="onShow / onHide"
          onPress={() =>
            showToast('success', {
              onShow: () => console.log('toast onShow'),
              onHide: () => console.log('toast onHide')
            })
          }
        />
        <Button
          label="onPress"
          onPress={() =>
            showToast('info', {onPress: () => console.log('toast pressed')})
          }
        />
      </View>

      <Text style={styles.sectionTitle}>键盘避让（先聚焦输入框）</Text>
      <View style={styles.row}>
        <Button
          label="Show above keyboard"
          onPress={() =>
            Toast.show({
              type: 'success',
              text1: message,
              position: 'bottom',
              bottomOffset: 40,
              avoidKeyboard: true
            })
          }
        />
      </View>

      {/* Toast 挂载点：App 根组件渲染一次即可，Toast.show 全局可用 */}
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
