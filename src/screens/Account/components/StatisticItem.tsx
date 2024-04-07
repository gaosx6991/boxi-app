import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export type Props = {
  count: number;
  label: string;
};

export default (props: Props) => {
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.root}>
      <Text style={styles.countTxt}>{props.count}</Text>
      <Text style={styles.labelTxt}>{props.label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: 91,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E3E3E3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countTxt: {
    fontSize: 24,
    color: '#464646',
  },
  labelTxt: {
    fontSize: 16,
    color: '#464646',
  },
});
