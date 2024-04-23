import React, {useEffect, useMemo} from 'react';
import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';

import {status} from '../store/User.ts';
import Toast from 'react-native-toast-message';
import {store} from '../store';
import {useAppSelector} from '../hooks';

export default () => {
  const userStatus = useAppSelector(status);
  const visible = useMemo<boolean>(
    () => userStatus === 'loading',
    [userStatus],
  );

  useEffect(() => {
    if (userStatus === 'failed') {
      return;
    }

    const title = store.getState().user.error?.name;
    const message = store.getState().user.error?.message;

    Toast.show({
      type: 'error',
      text1: title,
      text2: message,
    });
  }, [userStatus]);

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
