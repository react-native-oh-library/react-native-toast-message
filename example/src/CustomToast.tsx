/**
 * 自定义 Toast 用例集 — config 注册自定义类型 + animationConfig。
 * 参考 rn-tester 用例集结构：TestSuite / TestCase（@rnoh/testerino）。
 * 入口：App demo list -> "react-native-toast-message "
 */
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {TestSuite, TestCase} from '@rnoh/testerino';
import Toast, {BaseToast, ToastConfig} from 'react-native-toast-message';

export const customToastConfig: ToastConfig = {
  /*
    自定义类型 "tomato"：左侧色条 + 标题/正文自定义样式 + 右侧图标徽标。
    通过 Toast.show({ type: 'tomato', props: { badge } }) 使用。
  */
  tomato: ({text1, text2, onPress, props}) => (
    <BaseToast
      style={[styles.toastContainer, {borderLeftColor: '#e74c3c'}]}
      contentContainerStyle={styles.toastContent}
      text1={text1}
      text2={text2}
      text1Style={styles.toastText1}
      text2Style={styles.toastText2}
      onPress={onPress}
      renderTrailingIcon={() => (
        <View style={styles.iconBadge}>
          <Text style={styles.iconBadgeText}>{props?.badge ?? '🍅'}</Text>
        </View>
      )}
    />
  ),
  /*
    自定义类型 "plain"：无图标，仅自定义文案样式。
    通过 Toast.show({ type: 'plain' }) 使用。
  */
  plain: ({text1, text2, onPress}) => (
    <BaseToast
      style={[styles.toastContainer, {borderLeftColor: '#2c3e50'}]}
      contentContainerStyle={styles.toastContent}
      text1={text1}
      text2={text2}
      text1Style={styles.plainText1}
      text2Style={styles.plainText2}
      onPress={onPress}
    />
  )
};

export default function CustomToastSuite() {
  return (
    <TestSuite name="custom toast">
      <TestCase itShould="config 注册自定义类型 type: 'tomato'">
        <Button
          title="show custom toast"
          onPress={() =>
            Toast.show({
              type: 'tomato',
              text1: 'Custom toast',
              text2: "Registered via <Toast config={...} />",
              props: {badge: '🍅'}
            })
          }
        />
      </TestCase>

      <TestCase itShould="props 传参自定义图标徽标">
        <Button
          title="show with props.badge"
          onPress={() =>
            Toast.show({
              type: 'tomato',
              text1: 'Props badge',
              text2: "props: { badge: '⏱️' }",
              props: {badge: '⏱️'}
            })
          }
        />
      </TestCase>

      <TestCase itShould="自定义类型 type: 'plain'（text1Style / text2Style）">
        <Button
          title="show plain toast"
          onPress={() =>
            Toast.show({
              type: 'plain',
              text1: 'Custom text styles',
              text2: 'text1Style / text2Style'
            })
          }
        />
      </TestCase>

      <TestCase itShould="animationConfig: { type: 'spring', friction: 8 }">
        <Button
          title="show spring animation"
          onPress={() =>
            Toast.show({
              type: 'tomato',
              text1: 'Spring animation',
              text2: 'type: spring, friction 8',
              props: {badge: '🌀'},
              animationConfig: {type: 'spring', friction: 4, tension: 40}
            })
          }
        />
      </TestCase>

      <TestCase itShould="animationConfig: { type: 'timing', duration: 300 }">
        <Button
          title="show timing animation"
          onPress={() =>
            Toast.show({
              type: 'tomato',
              text1: 'Timing animation',
              text2: 'type: timing, 300ms',
              props: {badge: '⏱️'},
              animationConfig: {type: 'timing', duration: 300}
            })
          }
        />
      </TestCase>
    </TestSuite>
  );
}

const styles = StyleSheet.create({
  toastContainer: {
    borderLeftWidth: 6,
    borderRadius: 8
  },
  toastContent: {
    paddingHorizontal: 12
  },
  toastText1: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2c3e50'
  },
  toastText2: {
    fontSize: 12,
    color: '#7f8c8d'
  },
  plainText1: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a'
  },
  plainText2: {
    fontSize: 13,
    color: '#8e8e93'
  },
  iconBadge: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 36
  },
  iconBadgeText: {
    fontSize: 20
  }
});
