import * as React from 'react';
import {useCallback, useMemo} from 'react';
import EmptyActivity from './EmptyActivity.tsx';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {FlatList} from 'react-native';
import {
  completeOrderActivityList,
  getCompleteOrderActivityListAsync,
  resetCompleteActivityListPage,
  scene,
  status,
} from '../../../store/Order.ts';
import {ListRenderItemInfo} from '@react-native/virtualized-lists/Lists/VirtualizedList';
import Info from '../../../components/Info.tsx';
import {OrderActivity} from '../../../apis/Order.ts';
import ListItemSeparator from '../../../components/ListItemSeparator.tsx';

export default () => {
  const completeOrderActivityListValue = useAppSelector(
    completeOrderActivityList,
  );

  const renderItem = useCallback(
    ({item}: ListRenderItemInfo<OrderActivity>) => {
      const recipientInfo = item.recipientForm;

      return (
        <Info
          header={recipientInfo.recipientName}
          subHeader={recipientInfo.phoneNumber}
          detail={`${recipientInfo.address},${recipientInfo.postalZip}`}
        />
      );
    },
    [],
  );

  const statusValue = useAppSelector(status);
  const sceneValue = useAppSelector(scene);

  const refreshing = useMemo(
    () =>
      sceneValue === 'GetCompleteOrderActivityList' &&
      statusValue === 'loading',
    [statusValue, sceneValue],
  );

  const dispatch = useAppDispatch();

  const handleRefresh = useCallback(() => {
    dispatch(resetCompleteActivityListPage());
    dispatch(getCompleteOrderActivityListAsync());
  }, [dispatch, getCompleteOrderActivityListAsync]);

  const handleLoad = useCallback(() => {
    dispatch(getCompleteOrderActivityListAsync());
  }, [dispatch, getCompleteOrderActivityListAsync]);

  return (
    <FlatList
      data={completeOrderActivityListValue}
      renderItem={renderItem}
      ListEmptyComponent={EmptyActivity}
      keyExtractor={(item, index) => `${item.id}${index}`}
      refreshing={refreshing}
      onRefresh={handleRefresh}
      onEndReachedThreshold={0.2}
      onEndReached={handleLoad}
      ItemSeparatorComponent={ListItemSeparator}
    />
  );
};
