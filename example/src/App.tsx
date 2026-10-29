/**
 * Demo 路由 — react-native-toast-message 鸿蒙 example 注册清单
 *
 * ToastDemo —  demo：testerino 用例集（@rnoh/testerino），合并
 * BasicUsage / CustomToast 两个 TestSuite，单屏单 Toast 挂载。
 */
import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import ToastDemo from './ToastDemo';

interface DemoRegistryItem {
  key: string;
  category: string;
  module: () => React.ReactElement;
  title: string;
  description: string;
}

const demos: DemoRegistryItem[] = [
  {
    key: 'ToastDemo',
    category: 'UI',
    module: () => <ToastDemo />,
    title: 'react-native-toast-message ',
    description:
      'Toast测试用例'
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
