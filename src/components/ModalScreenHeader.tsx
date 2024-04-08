import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

// @ts-ignore
import close from '../assets/close.png';

type Props = {
  title: string;
  onClosePress: () => void;
};

export default (props: Props) => {
  return (
    <View style={styles.root}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.closeBtn}
        onPress={props.onClosePress}>
        <Image style={styles.closeImg} source={close}></Image>
      </TouchableOpacity>

      <Text style={styles.titleTxt}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#FAFAFA',
    width: '100%',
    height: 50,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#E2E2E2',
    alignItems: 'center',
  },
  closeBtn: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeImg: {
    width: 10,
    height: 10,
    resizeMode: 'cover',
    tintColor: '#5B57BA',
  },
  titleTxt: {
    fontSize: 18,
    color: '#1B1B1B',
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
