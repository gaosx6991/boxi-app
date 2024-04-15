import React, {useCallback} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import PaymentHistoryItem, {ItemProps} from './PaymentHistoryItem.tsx';
import {MillisecondTimestamp} from '../../../types';
import {ListRenderItemInfo} from '@react-native/virtualized-lists/Lists/VirtualizedList';
import ListItemSeparator from '../../../components/ListItemSeparator.tsx';
import PaymentHistoryHeader from './PaymentHistoryHeader.tsx';

const DATA: ItemProps[] = [
  {
    timestamp: 1712890989471 as unknown as MillisecondTimestamp,
    amount: 56.0,
    direction: 'Pay Out',
    description: 'BX-721880KK',
    title: 'Send Package',
  },
  {
    timestamp: 1712890998471 as unknown as MillisecondTimestamp,
    amount: 32.0,
    direction: 'Pay Out',
    description: 'BX-74782DZ',
    title: 'Send Package',
  },
  {
    timestamp: 1712890968471 as unknown as MillisecondTimestamp,
    amount: 100.0,
    direction: 'Pay In',
    description: 'Visa',
    title: 'Send Package',
  },
];

export default () => {
  const renderItem = useCallback(
    (info: ListRenderItemInfo<ItemProps>) => (
      <PaymentHistoryItem item={info.item} />
    ),
    [],
  );

  const itemSeparatorComponent = useCallback(
    () => <ListItemSeparator style={styles.listItemSeparator} />,
    [],
  );

  return (
    <FlatList
      style={styles.root}
      data={DATA}
      renderItem={renderItem}
      ItemSeparatorComponent={itemSeparatorComponent}
      ListHeaderComponent={<PaymentHistoryHeader />}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  listItemSeparator: {
    height: 16,
  },
});
