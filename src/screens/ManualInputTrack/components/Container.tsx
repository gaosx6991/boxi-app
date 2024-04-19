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
    paddingHorizontal: 20,
    paddingTop: 32,
    gap: 24,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
  },
});
