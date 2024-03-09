import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigatorProps} from 'react-native-screens/lib/typescript/native-stack/types';
import PrimaryButton from '../../../components/PrimaryButton.tsx';

export default () => {
  const navigation = useNavigation<NativeStackNavigatorProps>();

  const handleRegisterPress = useCallback(() => {
    navigation.navigate('Register');
  }, [navigation]);

  const renderDropShadow = useCallback(() => {
    return (
      <DropShadow
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 1,
          shadowRadius: 5,
        }}>
        <View
          style={{
            width: '100%',
            height: 16,
            marginBottom: -11,
            borderRadius: 16,
            backgroundColor: '#FAFAFA',
          }}></View>
      </DropShadow>
    );
  }, []);

  const [bottom, setBottom] = useState(-300);

  const rootStyle = useMemo(() => {
    return {
      bottom,
    };
  }, [bottom]);

  useEffect(() => {
    setTimeout(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setBottom(0);
    }, 200);
  }, []);

  const handleEmailLoginPress = useCallback(() => {
    navigation.navigate('Login', {type: 'Email'});
  }, [navigation]);

  const handlePhoneNumberLoginPress = useCallback(() => {
    navigation.navigate('Login', {type: 'Phone Number'});
  }, [navigation]);

  return (
    <View style={[styles.root, rootStyle]}>
      {renderDropShadow()}

      <View style={styles.container}>
        <Text style={styles.titleTxt}>Welcome to Boxi 👋 </Text>

        <PrimaryButton
          text={'Continue with Email'}
          onPress={handleEmailLoginPress}
        />

        <TouchableOpacity
          style={styles.phoneNumberLoginBtn}
          activeOpacity={0.7}
          onPress={handlePhoneNumberLoginPress}>
          <Text style={styles.phoneNumberLoginTxt}>
            Continue with Phone Number
          </Text>
        </TouchableOpacity>

        <Text style={styles.registerTxt}>
          Don’t have an account?{' '}
          <Text style={styles.registerBtn} onPress={handleRegisterPress}>
            Register
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    position: 'absolute',
    flexDirection: 'column',
  },
  container: {
    backgroundColor: '#FAFAFA',
    width: '100%',
    height: 288,
    borderRadius: 16,
    flexDirection: 'column',
    paddingHorizontal: 20,
  },
  titleTxt: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 26,
    marginLeft: 20,
  },
  phoneNumberLoginBtn: {
    width: '100%',
    height: 48,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },
  phoneNumberLoginTxt: {
    fontSize: 16,
    color: '#1B1B1B',
  },
  registerTxt: {
    fontSize: 14,
    color: '#00000060',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  registerBtn: {
    fontWeight: 'bold',
    color: '#5B57BA',
  },
});
