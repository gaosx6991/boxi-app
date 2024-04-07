import React from 'react';
import {StyleSheet, View} from 'react-native';
import StatisticItem, {Props as ItemProps} from './StatisticItem.tsx';

const itemList: ItemProps[] = [
  {label: 'Send Package', count: 16},
  {label: 'Receive Package', count: 5},
];

export default () => {
  return (
    <View style={styles.root}>
      {itemList.map((value, index) => (
        <StatisticItem key={index} count={value.count} label={value.label} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    gap: 15,
    width: '100%',
  },
});
