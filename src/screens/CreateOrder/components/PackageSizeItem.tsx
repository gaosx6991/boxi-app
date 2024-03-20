import React, {useMemo} from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {ImageSourcePropType} from 'react-native/Libraries/Image/Image';

export enum PACKAGE_SIZE {
  ENVELOPE,
  BOX,
  CARGO,
}

export type Props = {
  size: PACKAGE_SIZE;
  checked?: boolean;
  icon: ImageSourcePropType;
  label: string;
  onPress?: () => void;
};

export default (props: Props) => {
  const borderStyles: StyleProp<ViewStyle> = useMemo(() => {
    return {
      borderColor: props.checked ? '#5B57BA' : '#EEEEEE',
    };
  }, [props.checked]);

  return (
    <TouchableOpacity
      style={[styles.root, borderStyles]}
      activeOpacity={0.7}
      onPress={props.onPress}>
      <Image source={props.icon}></Image>
      <Text style={styles.label}>{props.label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: 118,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    backgroundColor: '#FAFAFA',
  },
  label: {
    fontSize: 14,
    color: '#00000035',
  },
});
