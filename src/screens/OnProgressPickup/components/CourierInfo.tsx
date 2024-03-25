import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

// @ts-ignore
import courier from '../../../assets/courier.png';
// @ts-ignore
import call from '../../../assets/call.png';
// @ts-ignore
import message from '../../../assets/inbox.png';

export default () => {
  return (
    <View style={styles.root}>
      <Image style={styles.avatar} source={courier} />
      <View style={styles.info}>
        <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode={'tail'}>
          Mark Oue
        </Text>
        <Text style={styles.numberTxt} numberOfLines={1} ellipsizeMode={'tail'}>
          8DWH823
        </Text>
      </View>
      <TouchableOpacity activeOpacity={0.7} style={styles.btn}>
        <Image style={styles.icon} source={call} />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7} style={styles.btn}>
        <Image style={styles.icon} source={message} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
  },
  info: {
    flex: 1,
  },
  nameTxt: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#464646',
  },
  numberTxt: {
    fontSize: 14,
    color: '#464646',
  },
  btn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#5B57BA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 16,
    height: 16,
    resizeMode: 'cover',
    tintColor: '#FFF',
  },
});
