import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ImageSourcePropType} from 'react-native/Libraries/Image/Image';
import {MillisecondTimestamp, Role} from '../../../types';
import {formatDate} from '../../../utils/datetime.ts';

type Props = {
  avatar: ImageSourcePropType;
  role: Role;
  username: string;
  online: MillisecondTimestamp;
};

export default (props: Props) => {
  return (
    <View style={styles.root}>
      <TouchableOpacity activeOpacity={0.7}>
        <Image style={styles.avatarImg} source={props.avatar} />
      </TouchableOpacity>

      <View style={styles.info}>
        <Text style={styles.roleTxt}>{props.role}</Text>
        <Text style={styles.usernameTxt}>{props.username}</Text>
      </View>

      <Text style={styles.onlineTxt} numberOfLines={1} ellipsizeMode={'tail'}>
        {formatDate(props.online)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    height: 66,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
  },
  avatarImg: {
    width: 24,
    height: 24,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  info: {
    flex: 1,
  },
  roleTxt: {
    fontWeight: 'bold',
    fontSize: 10,
    color: '#00000050',
  },
  usernameTxt: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
  },
  onlineTxt: {
    fontWeight: 'bold',
    fontSize: 10,
    color: '#00000050',
  },
});
