import React, {useCallback} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

// @ts-ignore
import empty_activity_logo from '../../../assets/empty_activity_logo.png';
import PrimaryButton from '../../../components/PrimaryButton.tsx';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigatorProps} from 'react-native-screens/lib/typescript/native-stack/types';

export default () => {
  const navigation = useNavigation<NativeStackNavigatorProps>();

  const handlePress = useCallback(() => {
    navigation.push('CreateOrder');
  }, [navigation]);

  return (
    <View style={styles.root}>
      <Image source={empty_activity_logo} style={styles.logo} />
      <Text style={styles.title}>No Activity</Text>
      <Text style={styles.label}>Create some order for you ?</Text>
      <PrimaryButton
        onPress={handlePress}
        styles={styles.btn}
        text={'Send a Package'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 240,
    height: 240,
    resizeMode: 'cover',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#000',
    textAlign: 'center',
    marginTop: 24,
  },
  label: {
    fontSize: 16,
    color: '#000',
    textAlignVertical: 'center',
    marginTop: 8,
  },
  btn: {
    marginTop: 24,
  },
});
