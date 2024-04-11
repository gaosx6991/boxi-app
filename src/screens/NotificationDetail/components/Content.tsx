import React from 'react';
import {StyleSheet, Text} from 'react-native';

type Props = {
  text: string;
};

export default (props: Props) => {
  return <Text style={styles.root}>{props.text}</Text>;
};

const styles = StyleSheet.create({
  root: {
    fontSize: 14,
    width: '100%',
    color: '#000000',
  },
});
