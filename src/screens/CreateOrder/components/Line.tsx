import React from 'react';
import {StyleSheet, View} from 'react-native';

export default () => {
  return <View style={styles.root} />;
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 1,
    backgroundColor: '#E5E5E5',
  },
});
