import React from 'react';
import {StyleSheet, Text} from 'react-native';

export default () => {
  return <Text style={styles.root}>Payment History</Text>;
};

const styles = StyleSheet.create({
  root: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
    marginBottom: 16,
  },
});
