import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Tester} from '@rnoh/testerino';
import Toast from 'react-native-toast-message';
import BasicUsageSuite from './BasicUsage';
import CustomToastSuite, {customToastConfig} from './CustomToast';

export default function ToastDemo() {
  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.container}
        keyboardShouldPersistTaps="handled">
        <Tester style={styles.tester}>
          <BasicUsageSuite />
          <CustomToastSuite />
        </Tester>
      </ScrollView>
      <Toast config={customToastConfig} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f2f2f7'
  },
  container: {
    flex: 1
  },
  tester: {
    width: '100%'
  }
});
