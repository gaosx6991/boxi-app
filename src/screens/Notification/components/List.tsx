import {SectionList, StyleSheet} from 'react-native';
import Item, {ItemProps} from './Item.tsx';
import React, {useCallback, useEffect, useMemo} from 'react';
import Header from './Header.tsx';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {
  getNotificationListAsync,
  notificationList,
  resetPage,
  resetScene,
  resetStatus,
  scene,
  status,
} from '../../../store/Notification.ts';
import {GetNotificationListResponse} from '../../../apis/Notification.ts';
import {MillisecondTimestamp} from '../../../types';
import Toast from 'react-native-toast-message';
import {store} from '../../../store';

export type ListProps = {
  title: string;
  data: ItemProps[];
};

export default () => {
  const notificationListValue = useAppSelector(notificationList);
  const data = useMemo<ListProps[]>(
    () => transformNotifications(notificationListValue || []),
    [notificationListValue],
  );
  const statusValue = useAppSelector(status);
  const sceneValue = useAppSelector(scene);
  const refreshing = useMemo<boolean>(
    () => statusValue === 'loading' && sceneValue === 'GetNotificationList',
    [statusValue, sceneValue],
  );

  const dispatch = useAppDispatch();
  const handleRefresh = useCallback(() => {
    if ('loading' === statusValue) {
      return;
    }

    dispatch(resetPage());
    dispatch(getNotificationListAsync());
  }, [statusValue]);
  const loadMore = useCallback(() => {
    if ('loading' === statusValue) {
      return;
    }

    dispatch(getNotificationListAsync());
  }, [statusValue]);

  const renderItem = useCallback(
    ({item}: {item: ItemProps}) => <Item item={item} />,
    [],
  );

  const renderHeader = useCallback(({section}: {section: ListProps}) => {
    return <Header title={section.title} />;
  }, []);

  useEffect(() => {
    if (statusValue === 'failed' || statusValue === 'GetNotificationList') {
      const error = store.getState().notification.error;
      Toast.show({
        type: 'error',
        text1: error.name,
        text2: error.message,
      });
    }
  }, [statusValue, sceneValue]);

  useEffect(() => {
    handleRefresh();

    return () => {
      dispatch(resetScene());
      dispatch(resetStatus());
    };
  }, []);

  return (
    <SectionList
      style={styles.root}
      sections={data}
      keyExtractor={(item, index) => `${item.id} + ${index}`}
      renderItem={renderItem}
      renderSectionHeader={renderHeader}
      refreshing={refreshing}
      onRefresh={handleRefresh}
      onEndReachedThreshold={0.2}
      onEndReached={loadMore}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
});

function transformNotifications(
  notifications: GetNotificationListResponse,
): ListProps[] {
  const groupedNotifications: {[key: string]: Array<any>} = {};

  notifications.forEach(notification => {
    const groupId = notification.group;
    if (!groupedNotifications[groupId]) {
      groupedNotifications[groupId] = [];
    }

    groupedNotifications[groupId].push({
      ...notification,
      timestamp: notification.timestamp as unknown as MillisecondTimestamp,
    });
  });

  return Object.keys(groupedNotifications).map(groupId => ({
    title: groupId,
    data: groupedNotifications[groupId],
  }));
}
