import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {ModalScreenRef, NotificationItemProps} from '../../../types';
import {formatTimeAgo} from '../../../utils/datetime.ts';
import NotificationDetail from '../../NotificationDetail/NotificationDetail.tsx';
import {
  scene,
  setCurrentNotificationId,
  status,
  updateNotificationAsync,
  updateNotificationList,
} from '../../../store/Notification.ts';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {store} from '../../../store';

type Props = {
  item: NotificationItemProps;
};

export default ({item: props}: Props) => {
  const backgroundColor: StyleProp<ViewStyle> = useMemo(() => {
    return {backgroundColor: props.isNew ? '#5B57BA05' : 'transparent'};
  }, [props.isNew]);

  const ref = useRef<ModalScreenRef>(null);

  const dispatch = useAppDispatch();

  const handlePress = useCallback(() => {
    ref.current?.show();

    if (!props.isNew) {
      return;
    }
    dispatch(setCurrentNotificationId(props.id));
    dispatch(updateNotificationAsync({id: props.id, isNew: false}));
  }, [ref, props.isNew, props.id]);

  const sceneValue = useAppSelector(scene);
  const statusValue = useAppSelector(status);

  useEffect(() => {
    if (
      sceneValue === 'UpdateNotification' &&
      statusValue === 'success' &&
      store.getState().notification.currentNotificationId === props.id
    ) {
      dispatch(updateNotificationList({id: props.id, isNew: false}));
    }
  }, [sceneValue, statusValue, props.id]);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.root, backgroundColor]}
      onPress={handlePress}>
      <View style={styles.content}>
        <Text style={styles.titleTxt} numberOfLines={1} ellipsizeMode={'tail'}>
          {props.title}
        </Text>
        <Text
          style={styles.contentTxt}
          numberOfLines={2}
          ellipsizeMode={'tail'}>
          {props.content}
        </Text>
      </View>

      {props.isNew ? (
        <Text style={styles.newTxt}>New</Text>
      ) : (
        <Text style={styles.timestampTxt}>
          {formatTimeAgo(props.timestamp)}
        </Text>
      )}

      <NotificationDetail ref={ref} item={props} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    width: '100%',
    flexDirection: 'row',
    gap: 14,
  },
  content: {
    gap: 8,
    flex: 1,
  },
  titleTxt: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
  },
  contentTxt: {
    fontSize: 12,
    color: '#000',
  },
  newTxt: {
    fontWeight: 'bold',
    fontSize: 10,
    color: '#5B57BA',
  },
  timestampTxt: {
    fontWeight: 'bold',
    fontSize: 10,
    color: '#000',
  },
});
