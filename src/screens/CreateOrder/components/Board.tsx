import React, {PropsWithChildren} from 'react';
import {ScrollView, StyleSheet} from 'react-native';

type Props = PropsWithChildren;

export default (props: Props) => {
  return (
    <ScrollView
      style={styles.root}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      {props.children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#FAFAFA',
    padding: 20,
  },
  container: {
    paddingBottom: 54,
  },
});
