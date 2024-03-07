import React from 'react';
import {StyleSheet, View} from 'react-native';

type Props = {
  selected: boolean;
};

export default (props: Props) => {
  return (
    <View style={[styles.root, props.selected ? styles.selected : {}]}></View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#979797',
  },
  selected: {
    backgroundColor: '#5B57BA',
  },
});
