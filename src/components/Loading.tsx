import React, {useEffect, useMemo} from 'react';
import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';

import {status as userStatusValue} from '../store/User.ts';
import Toast from 'react-native-toast-message';
import {store} from '../store';
import {useAppSelector} from '../hooks';
import {status as orderStatusValue} from '../store/Order.ts';

export default () => {
  const userStatus = useAppSelector(userStatusValue);
  const orderStatus = useAppSelector(orderStatusValue);
  const visible = useMemo<boolean>(
    () => userStatus === 'loading' || orderStatus === 'loading',
    [userStatus, orderStatus],
  );

  useEffect(() => {
    if (userStatus !== 'failed' && orderStatus !== 'failed') {
      return;
    }

    if (userStatus === 'failed') {
      const title = store.getState().user.error?.name as string;
      const message = store.getState().user.error?.message as string;

      Toast.show({
        type: 'error',
        text1: title,
        text2: message,
      });
    } else if (orderStatus === 'failed') {
      const title = store.getState().order.error?.name as string;
      const message = store.getState().order.error?.message as string;

      Toast.show({
        type: 'error',
        text1: title,
        text2: message,
      });
    }
  }, [userStatus, orderStatus]);

  return (
    <Modal
      animationType={'fade'}
      transparent={true}
      visible={visible}
      statusBarTranslucent={true}>
      <View style={styles.root}>
        <ActivityIndicator size={'large'} color={'#5B57BA'} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#00000050',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
