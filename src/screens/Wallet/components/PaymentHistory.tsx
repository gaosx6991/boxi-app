import React, {useCallback, useEffect, useMemo} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import PaymentHistoryItem from './PaymentHistoryItem.tsx';
import {ListRenderItemInfo} from '@react-native/virtualized-lists/Lists/VirtualizedList';
import ListItemSeparator from '../../../components/ListItemSeparator.tsx';
import PaymentHistoryHeader from './PaymentHistoryHeader.tsx';
import {PaymentHistoryListItem} from '../../../apis/Balance.ts';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {
  getPaymentHistoryListAsync,
  paymentHistoryList,
  resetPage,
  resetScene,
  resetStatus,
  scene,
  status,
} from '../../../store/Balance.ts';

export default () => {
  const renderItem = useCallback(
    (info: ListRenderItemInfo<PaymentHistoryListItem>) => (
      <PaymentHistoryItem item={info.item} />
    ),
    [],
  );

  const itemSeparatorComponent = useCallback(
    () => <ListItemSeparator style={styles.listItemSeparator} />,
    [],
  );

  const data = useAppSelector(paymentHistoryList);

  const dispatch = useAppDispatch();

  const handleRefresh = useCallback(() => {
    dispatch(resetPage());
    dispatch(getPaymentHistoryListAsync());
  }, [dispatch]);

  const handleLoadMore = useCallback(() => {
    dispatch(getPaymentHistoryListAsync());
  }, [dispatch]);

  const statusValue = useAppSelector(status);
  const sceneValue = useAppSelector(scene);
  const refreshing = useMemo(
    () => sceneValue === 'GetPaymentHistoryList' && statusValue === 'loading',
    [sceneValue, statusValue],
  );

  useEffect(() => {
    return () => {
      dispatch(resetStatus());
      dispatch(resetScene());
      dispatch(resetPage());
    };
  }, []);

  return (
    <FlatList
      style={styles.root}
      data={data}
      keyExtractor={(item: PaymentHistoryListItem, index: number) =>
        `${item.id}-${index}`
      }
      renderItem={renderItem}
      ItemSeparatorComponent={itemSeparatorComponent}
      ListHeaderComponent={<PaymentHistoryHeader />}
      onRefresh={handleRefresh}
      // onEndReachedThreshold={0.2}
      onEndReached={handleLoadMore}
      refreshing={refreshing}
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
