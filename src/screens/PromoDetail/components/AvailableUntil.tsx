import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {MillisecondTimestamp} from '../../../types';
import {formatUnixTimestampToDateString} from '../../../utils/datetime.ts';

type Props = {
  availableUntil: MillisecondTimestamp;
};

export default (props: Props) => {
  return (
    <View style={styles.root}>
      <Text style={styles.txt}>Available until</Text>
      <Text style={styles.txt}>
        {formatUnixTimestampToDateString(props.availableUntil)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txt: {
    fontWeight: 'bold',
    fontSize: 10,
    color: '#000',
  },
});
