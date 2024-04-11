import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {ImageSourcePropType} from 'react-native/Libraries/Image/Image';

type Props = {image: ImageSourcePropType};

export default (props: Props) => {
  return <Image style={styles.root} source={props.image} />;
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 170,
    borderRadius: 4,
    resizeMode: 'cover',
  },
});
