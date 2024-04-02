import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

type Props = {
  style?: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  return <View style={[styles.root, props.style]}></View>;
};

const styles = StyleSheet.create({
  root: {
    width: 1,
    height: 10,
  },
});
