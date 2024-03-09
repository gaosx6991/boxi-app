import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

type Props = {
  styles: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  return (
    <View style={[styles.root, props.styles]}>
      <TouchableOpacity activeOpacity={0.7}>
        <Text style={styles.txt}>Forgot Password ?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 24,
  },
  txt: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#5B57BA',
  },
});
