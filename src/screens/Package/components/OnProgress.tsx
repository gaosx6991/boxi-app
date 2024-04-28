import * as React from 'react';
import {useCallback, useMemo} from 'react';
import EmptyActivity from './EmptyActivity.tsx';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {FlatList} from 'react-native';
import {
  getOnProgressOrderActivityListAsync,
  onProgressOrderActivityList,
  resetOnProgressActivityListPage,
  scene,
  status,
} from '../../../store/Order.ts';
import {ListRenderItemInfo} from '@react-native/virtualized-lists/Lists/VirtualizedList';
import Info from '../../../components/Info.tsx';
import {OrderActivity} from '../../../apis/Order.ts';
import ListItemSeparator from '../../../components/ListItemSeparator.tsx';

export default () => {
  const onProgressOrderActivityListValue = useAppSelector(
    onProgressOrderActivityList,
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
      sceneValue === 'GetOnProgressOrderActivityList' &&
      statusValue === 'loading',
    [statusValue, sceneValue],
  );

  const dispatch = useAppDispatch();

  const handleRefresh = useCallback(() => {
    dispatch(resetOnProgressActivityListPage());
    dispatch(getOnProgressOrderActivityListAsync());
  }, [dispatch, getOnProgressOrderActivityListAsync]);

  const handleLoad = useCallback(() => {
    dispatch(getOnProgressOrderActivityListAsync());
  }, [dispatch, getOnProgressOrderActivityListAsync]);

  return (
    <FlatList
      data={onProgressOrderActivityListValue}
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
