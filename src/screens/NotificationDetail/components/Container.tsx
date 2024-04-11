import React, {PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';

type Props = PropsWithChildren;

export default (props: Props) => {
  return <View style={styles.root}>{props.children}</View>;
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    gap: 24,
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
  },
});
