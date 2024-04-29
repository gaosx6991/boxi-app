import React, {useCallback} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

// @ts-ignore
import profile_avatar from '../../../assets/mock/profile_avatar.png';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigatorProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {useAppSelector} from '../../../hooks';
import {accountName, avatar} from '../../../store/User.ts';

export default () => {
  const navigation = useNavigation<NativeStackNavigatorProps>();

  const handleEditPress = useCallback(() => {
    navigation.push('EditProfile');
  }, [navigation]);

  const avatarValue = useAppSelector(avatar);
  const accountNameValue = useAppSelector(accountName);

  return (
    <View style={styles.root}>
      <TouchableOpacity activeOpacity={0.7}>
        <Image
          source={avatarValue ? {uri: avatarValue} : profile_avatar}
          style={styles.avatar}
        />
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.usernameTxt}>{accountNameValue}</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={handleEditPress}>
          <Text style={styles.editTxt}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 58,
    flexDirection: 'row',
    gap: 8,
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 16,
  },
  card: {
    flex: 1,
    backgroundColor: '#5B57BA',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  usernameTxt: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  editTxt: {
    fontSize: 10,
    color: '#FFF',
  },
});
