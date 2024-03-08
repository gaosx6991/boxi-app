import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';

type Props = {
  styles: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  return (
    <View style={[styles.root, props.styles]}>
      <Text style={styles.txt}>Create Account</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  txt: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#000',
  },
});
