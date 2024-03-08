import React, {useCallback} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

// @ts-ignore
import back from '../../../assets/back.png';
import {useNavigation} from '@react-navigation/native';

export default () => {
  const navigation = useNavigation();

  const handlePress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.root}>
      <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
        <Image source={back} style={styles.img} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
  },
  img: {
    width: 14,
    height: 12,
    tintColor: '#05944F',
  },
});
