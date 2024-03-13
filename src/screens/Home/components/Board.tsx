import React, {PropsWithChildren} from 'react';
import {ScrollView, StyleSheet} from 'react-native';

type Props = PropsWithChildren;

export default (props: Props) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.root}
      contentContainerStyle={styles.container}>
      {props.children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  container: {
    padding: 20,
    flexDirection: 'column',
    gap: 32,
  },
});
