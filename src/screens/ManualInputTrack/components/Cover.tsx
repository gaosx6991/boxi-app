import React from 'react';
import {Image, StyleSheet} from 'react-native';

// @ts-ignore
import track_package_cover from '../../../assets/track_package_cover.png';

export default () => {
  return <Image style={styles.root} source={track_package_cover}></Image>;
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 170,
    resizeMode: 'cover',
  },
});
