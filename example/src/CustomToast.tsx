/**
 * 自定义 Toast demo — config 注册自定义类型 + animationConfig。
 * 入口：App demo list -> "Custom Toast Config"
 */
import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Toast, {BaseToast, ToastConfig} from 'react-native-toast-message';

const toastConfig: ToastConfig = {
  /*
    自定义类型 "tomato"：左侧色条 + 标题/正文自定义样式 + 右侧图标。
    通过 Toast.show({ type: 'tomato' }) 使用。
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
  )
};

export default function CustomToastExample() {
  const [useTiming, setUseTiming] = useState(false);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}>
      <Text style={styles.sectionTitle}>自定义类型（type: 'tomato'）</Text>
      <View style={styles.row}>
        <Button
          label="Show custom toast"
          onPress={() =>
            Toast.show({
              type: 'tomato',
              text1: 'Custom toast',
              text2: 'Registered via <Toast config={...} />',
              props: {badge: '🍅'}
            })
          }
        />
      </View>

      <Text style={styles.sectionTitle}>动画配置 animationConfig</Text>
      <View style={styles.row}>
        <Button
          label={`Anim: ${useTiming ? 'timing' : 'spring'} (tap to switch)`}
          onPress={() => setUseTiming((v) => !v)}
        />
      </View>
      <View style={styles.row}>
        <Button
          label="Show with animationConfig"
          onPress={() =>
            Toast.show({
              type: 'tomato',
              text1: useTiming ? 'Timing animation' : 'Spring animation',
              text2: `type: ${useTiming ? 'timing, 300ms' : 'spring, friction 8'}`,
              props: {badge: useTiming ? '⏱️' : '🌀'},
              animationConfig: useTiming
                ? {type: 'timing', duration: 300}
                : {type: 'spring', friction: 8}
            })
          }
        />
      </View>

      {/* config 注册自定义类型的地方就在这里 */}
      <Toast config={toastConfig} />
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
  },
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
  iconBadge: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 36
  },
  iconBadgeText: {
    fontSize: 20
  }
});
