import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Props = {
  newMessageCount?: number;
};

export default (props: Props) => {
  return props.newMessageCount && props.newMessageCount > 0 ? (
    <View style={styles.root}>
      <Text style={styles.txt}>{props.newMessageCount} new messages</Text>
    </View>
  ) : (
    <></>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
    width: '100%',
  },
  txt: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
  },
});
