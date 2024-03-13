import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {ImageSourcePropType} from 'react-native/Libraries/Image/Image';

export type Props = {
  icon: ImageSourcePropType;
  label: string;
  onPress: () => void;
};

export default (props: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={props.onPress}
      style={styles.root}>
      <Image style={styles.icon} source={props.icon} />
      <Text style={styles.label}>{props.label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  label: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
