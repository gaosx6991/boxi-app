import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

// @ts-ignore
import profile_avatar from '../../../assets/mock/profile_avatar.png';
// @ts-ignore
import camera from '../../../assets/camera.png';

type Props = {
  avatar: string;
  setAvatar: (avatar: string) => void;
};

export default ({avatar}: Props) => {
  return (
    <TouchableOpacity style={styles.root} activeOpacity={0.7}>
      <Image
        style={styles.avatar}
        source={avatar ? {uri: avatar} : profile_avatar}
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
