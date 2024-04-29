import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import StatisticItem, {Props as ItemProps} from './StatisticItem.tsx';
import {receivePackageCount, sendPackageCount} from '../../../store/User.ts';
import {useAppSelector} from '../../../hooks';

export default () => {
  const sendPackageCountValue = useAppSelector(sendPackageCount);
  const receivePackageCountValue = useAppSelector(receivePackageCount);

  const itemList: ItemProps[] = useMemo(() => {
    return [
      {label: 'Send Package', count: sendPackageCountValue || 0},
      {label: 'Receive Package', count: receivePackageCountValue || 0},
    ];
  }, [sendPackageCountValue, receivePackageCountValue]);

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
