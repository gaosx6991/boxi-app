import React, {PropsWithChildren} from 'react';
import {ScrollView, StyleProp, StyleSheet, ViewStyle} from 'react-native';

type Props = PropsWithChildren & {
  containerStyle?: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.root}
      contentContainerStyle={[styles.container, props.containerStyle]}>
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
    paddingHorizontal: 20,
    paddingVertical: 40,
    flexDirection: 'column',
    gap: 24,
  },
});
