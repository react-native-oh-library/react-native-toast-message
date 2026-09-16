/**
 * Demo 路由 — react-native-toast-message 鸿蒙 example 注册清单
 *
 * 1. BasicUsageExample — 内置预设：success / error / info、top/bottom 位置、
 *    偏移量、autoHide 与手动 hide、onPress / onShow / onHide 回调、键盘避让。
 * 2. CustomToastExample — 通过 `config` 自定义 Toast 类型、自定义文案样式、
 *    animationConfig（spring / timing）。
 */
import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import BasicUsageExample from './BasicUsage';
import CustomToastExample from './CustomToast';

interface DemoRegistryItem {
  key: string;
  category: string;
  module: () => React.ReactElement;
  title: string;
  description: string;
}

const demos: DemoRegistryItem[] = [
  {
    key: 'BasicUsageExample',
    category: 'UI',
    module: () => <BasicUsageExample />,
    title: 'Toast Basic Usage',
    description:
      '内置预设：Toast.show({ type: success/error/info })、position top/bottom、topOffset/bottomOffset、autoHide 与 Toast.hide()、onPress/onShow/onHide 回调、TextInput + 键盘避让。'
  },
  {
    key: 'CustomToastExample',
    category: 'UI',
    module: () => <CustomToastExample />,
    title: 'Custom Toast Config',
    description:
      '通过 config 注册自定义 Toast 类型（tomatoToast）、自定义 text1Style/text2Style、renderTrailingIcon、animationConfig spring/timing 切换。'
  }
];

export default function App() {
  const [currentDemoKey, setCurrentDemoKey] = useState<string | null>(null);
  const currentDemo = demos.find((d) => d.key === currentDemoKey);

  const backClickHandle = () => {
    setCurrentDemoKey(null);
  };

  if (currentDemo) {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.backButton}
          underlayColor="#d0d0d0"
          onPress={backClickHandle}>
          <Text style={styles.backButtonText}>‹ Back to demo list</Text>
        </TouchableHighlight>
        <View style={styles.demoContainer}>{currentDemo.module()}</View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>react-native-toast-message</Text>
      <Text style={styles.subHeader}>
        v2.5.2 · react-native-harmony (RNOH) 0.77
      </Text>
      {demos.map((demo) => (
        <TouchableHighlight
          key={demo.key}
          style={styles.item}
          underlayColor="#dddddd"
          onPress={() => setCurrentDemoKey(demo.key)}>
          <View>
            <Text style={styles.itemTitle}>{demo.title}</Text>
            <Text style={styles.itemMeta}>
              category: {demo.category} | key: {demo.key}
            </Text>
            <Text style={styles.itemDescription}>{demo.description}</Text>
          </View>
        </TouchableHighlight>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginHorizontal: 16
  },
  subHeader: {
    fontSize: 12,
    color: '#666666',
    marginHorizontal: 16,
    marginBottom: 8
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 8
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2883d2'
  },
  itemMeta: {
    fontSize: 11,
    color: '#888888',
    marginTop: 2
  },
  itemDescription: {
    fontSize: 12,
    color: '#444444',
    marginTop: 4
  },
  backButton: {
    backgroundColor: '#eeeeee',
    paddingVertical: 10,
    paddingHorizontal: 16
  },
  backButtonText: {
    fontSize: 15,
    color: '#2883d2'
  },
  demoContainer: {
    flex: 1
  }
});
