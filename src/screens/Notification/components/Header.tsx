import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Props = {
  title: string;
};

export default (props: Props) => {
  return (
    <View style={styles.root}>
      <Text style={styles.titleTxt}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
    width: '100%',
  },
  titleTxt: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});
