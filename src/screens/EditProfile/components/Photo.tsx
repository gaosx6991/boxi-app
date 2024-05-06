// @ts-ignore
import {API_URL} from 'react-native-dotenv';
import React, {useCallback, useEffect, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

// @ts-ignore
import profile_avatar from '../../../assets/mock/profile_avatar.png';
// @ts-ignore
import camera from '../../../assets/camera.png';
import DocumentPicker, {
  DocumentPickerResponse,
  isCancel,
  isInProgress,
} from 'react-native-document-picker';
import Toast from 'react-native-toast-message';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {
  scene,
  setScene,
  status,
  uploadFileAsync,
} from '../../../store/Upload.ts';
import {store} from '../../../store';

type Props = {
  avatar: string;
  setAvatar: (avatar: string) => void;
};

export default ({avatar, setAvatar}: Props) => {
  const [result, setResult] = useState<
    DocumentPickerResponse | undefined | null
  >(null);

  const dispatch = useAppDispatch();

  const statusValue = useAppSelector(status);
  const sceneValue = useAppSelector(scene);

  useEffect(() => {
    if (result) {
      dispatch(setScene('UploadAvatar'));
      dispatch(uploadFileAsync(result));
    }
  }, [result]);

  useEffect(() => {
    if (statusValue === 'success' && sceneValue === 'UploadAvatar') {
      setAvatar(store.getState().upload.url);
    }
  }, [statusValue, sceneValue]);

  const handlePress = useCallback(async () => {
    try {
      const pickerResult = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
      });
      setResult(pickerResult);
    } catch (e: unknown) {
      if (isCancel(e)) {
        Toast.show({
          type: 'error',
          text1: 'cancelled',
          text2:
            'User cancelled the picker, exit any dialogs or menus and move on',
        });
      } else if (isInProgress(e)) {
        Toast.show({
          type: 'error',
          text1: 'in progress',
          text2:
            'multiple pickers were opened, only the last will be considered',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: (e as Error).name,
          text2: (e as Error).message,
        });
      }
    }
  }, []);

  return (
    <TouchableOpacity
      style={styles.root}
      activeOpacity={0.7}
      onPress={handlePress}>
      <Image
        style={styles.avatar}
        source={avatar ? {uri: API_URL + avatar} : profile_avatar}
      />
      <View style={styles.fab}>
        <Image style={styles.icon} source={camera} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: 'green',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    resizeMode: 'cover',
  },
  fab: {
    backgroundColor: '#5B57BA',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 12,
    position: 'absolute',
    bottom: 0,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  icon: {
    width: 8,
    height: 8,
    resizeMode: 'cover',
    tintColor: '#FAFAFA',
  },
});
