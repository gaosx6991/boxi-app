import React from 'react';
import {Image, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
// @ts-ignore
import logo from '../../../assets/logo.png';

type Props = {
  style: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  return (
    <View style={[styles.root, props.style]}>
      <Image source={logo} style={styles.img} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  img: {
    width: 112,
    height: 30,
  },
});
