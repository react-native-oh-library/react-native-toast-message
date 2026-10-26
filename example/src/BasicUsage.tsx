/**
 * 基础用法用例集 — 内置 success / error / info 预设 + 常用 props。
 * 参考 rn-tester 用例集结构：TestSuite / TestCase（@rnoh/testerino）。
 * 入口：App demo list -> "react-native-toast-message "
 */
import React, {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {TestSuite, TestCase} from '@rnoh/testerino';
import Toast, {ToastShowParams} from 'react-native-toast-message';

type ToastType = 'success' | 'error' | 'info';

export default function BasicUsageSuite() {
  const [message, setMessage] = useState('Hello from HarmonyOS');
  const [callbackLog, setCallbackLog] = useState('—');
  const [pressLog, setPressLog] = useState('—');

  const showToast = (
    type: ToastType,
    extra?: Partial<ToastShowParams>
  ) => {
    Toast.show({
      type,
      text1: message.length > 0 ? message : 'Hello from HarmonyOS',
      text2: `type: ${type}`,
      ...extra
    });
  };

  return (
    <TestSuite name="toast">
      <TestCase itShould="TextInput 自定义 text1 文案">
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Input toast text1"
        />
      </TestCase>

      <TestCase itShould="Toast.show({ type: 'success' })">
        <Button
          title="show success"
          onPress={() => showToast('success')}
        />
      </TestCase>

      <TestCase itShould="Toast.show({ type: 'error' })">
        <Button
          title="show error"
          onPress={() => showToast('error')}
        />
      </TestCase>

      <TestCase itShould="Toast.show({ type: 'info' })">
        <Button title="show info" onPress={() => showToast('info')} />
      </TestCase>

      <TestCase itShould="position: 'bottom' + bottomOffset: 80">
        <Button
          title="show bottom"
          onPress={() =>
            showToast('info', {
              position: 'bottom',
              bottomOffset: 80
            })
          }
        />
      </TestCase>

      <TestCase itShould="topOffset: 120">
        <Button
          title="show top offset 120"
          onPress={() => showToast('success', {topOffset: 120})}
        />
      </TestCase>

      <TestCase itShould="visibilityTime: 1000（1s 后自动隐藏）">
        <Button
          title="show, auto hide in 1s"
          onPress={() => showToast('info', {visibilityTime: 1000})}
        />
      </TestCase>

      <TestCase itShould="autoHide: false + Toast.hide()">
        <View style={styles.buttonGroup}>
          <Button
            title="show sticky"
            onPress={() =>
              showToast('error', {autoHide: false, swipeable: true})
            }
          />
          <Button
            title="Toast.hide()"
            onPress={() => Toast.hide()}
          />
        </View>
      </TestCase>

      <TestCase itShould="swipeable: true（手势滑动关闭）">
        <Button
          title="show swipeable"
          onPress={() =>
            showToast('info', {autoHide: false, swipeable: true})
          }
        />
      </TestCase>

      <TestCase itShould="swipeable: false">
        <Button
          title="show swipeable"
          onPress={() =>
            showToast('info', {autoHide: false, swipeable: false})
          }
        />
      </TestCase>

      <TestCase itShould="onShow / onHide 回调">
        <Button
          title="show with callbacks"
          onPress={() =>
            showToast('success', {
              onShow: () => setCallbackLog('onShow triggered'),
              onHide: () => setCallbackLog('onHide triggered')
            })
          }
        />
        <Text style={styles.log}>callback: {callbackLog}</Text>
      </TestCase>

      <TestCase itShould="onPress 点击回调">
        <Button
          title="show pressable toast"
          onPress={() =>
            showToast('info', {
              onPress: () => setPressLog('toast pressed')
            })
          }
        />
        <Text style={styles.log}>onPress: {pressLog}</Text>
      </TestCase>

      <TestCase itShould="键盘避让（position: 'bottom' + avoidKeyboard）">
        <Button
          title="show above keyboard"
          onPress={() =>
            Toast.show({
              type: 'success',
              text1: message.length > 0 ? message : 'Hello from HarmonyOS',
              position: 'bottom',
              bottomOffset: 40,
              avoidKeyboard: true
            })
          }
        />
        <Text style={styles.hint}>
          先聚焦顶部输入框拉起键盘，再点击按钮，Toast 应显示在键盘上方
        </Text>
      </TestCase>
    </TestSuite>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#f2f2f7',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14
  },
  buttonGroup: {
    gap: 8
  },
  log: {
    fontSize: 12,
    color: '#3c3c43',
    marginTop: 6
  },
  hint: {
    fontSize: 12,
    color: '#8e8e93',
    marginTop: 6
  }
});
