import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ImageSourcePropType} from 'react-native/Libraries/Image/Image';

export type Props = {
  title: string;
  onViewAllPress: () => void;
  banner: ImageSourcePropType;
};

export default (props: Props) => {
  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.titleTxt}>{props.title}</Text>

        <TouchableOpacity activeOpacity={0.7} onPress={props.onViewAllPress}>
          <Text style={styles.btnTxt}>View All</Text>
        </TouchableOpacity>
      </View>

      <Image style={styles.bannerImg} source={props.banner} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'column',
    gap: 16,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleTxt: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000000',
  },
  btnTxt: {
    fontSize: 10,
    color: '#000',
  },
  bannerImg: {
    width: '100%',
    height: 170,
    resizeMode: 'stretch',
  },
});
