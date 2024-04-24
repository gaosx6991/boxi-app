import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import Input from '../../../components/Input.tsx';
import PrimaryButton from '../../../components/PrimaryButton.tsx';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../../types';
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
} from '../../../utils/validate.ts';
import {NativeStackNavigatorProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {
  loginByEmailAsync,
  loginByPhoneNumberAsync,
  scene,
  setScene,
  status,
} from '../../../store/User.ts';
import Toast from 'react-native-toast-message';

type Props = {
  styles: StyleProp<ViewStyle>;
};

type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;

export default (props: Props) => {
  const route = useRoute<LoginScreenRouteProp>();
  const {type: loginType} = route.params;

  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [phoneNumberValid, setPhoneNumberValid] = useState<boolean>(true);
  const [emailValid, setEmailValid] = useState<boolean>(true);
  const [passwordValid, setPasswordValid] = useState<boolean>(true);

  const [phoneNumberValidErrMsg, setPhoneNumberValidErrMsg] =
    useState<string>('');
  const [emailValidErrMsg, setEmailValidErrMsg] = useState<string>('');
  const [passwordValidErrMsg, setPasswordValidErrMsg] = useState<string>('');

  const handlePhoneNumberValueChange = useCallback((value: string) => {
    setPhoneNumber(value);

    const errMsg = validatePhoneNumber(value);
    if (errMsg) {
      setPhoneNumberValid(false);
      setPhoneNumberValidErrMsg(errMsg);
    } else {
      setPhoneNumberValid(true);
    }
  }, []);
  const handleEmailValueChange = useCallback((value: string) => {
    setEmail(value);

    const errMsg = validateEmail(value);
    if (errMsg) {
      setEmailValid(false);
      setEmailValidErrMsg(errMsg);
    } else {
      setEmailValid(true);
    }
  }, []);
  const handlePasswordValueChange = useCallback((value: string) => {
    setPassword(value);

    const errMsg = validatePassword(value);
    if (errMsg) {
      setPasswordValid(false);
      setPasswordValidErrMsg(errMsg);
    } else {
      setPasswordValid(true);
    }
  }, []);

  const disabled = useMemo(
    () =>
      (loginType === 'Phone Number' && !phoneNumberValid) ||
      (loginType === 'Email' && !emailValid) ||
      !passwordValid,
    [loginType, phoneNumberValid, emailValid, passwordValid],
  );

  useEffect(() => {
    loginType === 'Phone Number' && handlePhoneNumberValueChange(phoneNumber);
    loginType === 'Email' && handleEmailValueChange(email);
    handlePasswordValueChange(password);
  }, []);

  const userStatus = useAppSelector(status);
  const userScene = useAppSelector(scene);

  const navigation = useNavigation<NativeStackNavigatorProps>();

  const dispatch = useAppDispatch();

  const handlePress = useCallback(() => {
    loginType === 'Email' && dispatch(setScene('LoginByEmail'));
    loginType === 'Email' && dispatch(loginByEmailAsync({email, password}));
    loginType === 'Phone Number' && dispatch(setScene('LoginByPhoneNumber'));
    loginType === 'Phone Number' &&
      dispatch(loginByPhoneNumberAsync({phoneNumber, password}));
  }, [loginType, email, phoneNumber, password]);

  useEffect(() => {
    if (
      userStatus === 'success' &&
      ((loginType === 'Email' && userScene === 'LoginByEmail') ||
        (loginType === 'Phone Number' && userScene === 'LoginByPhoneNumber'))
    ) {
      Toast.show({
        type: 'success',
        text1: 'Login Success',
        text2: 'Please enjoy',
      });

      navigation.reset({
        index: 0,
        routes: [{name: 'BottomTabNavigator'}],
      });
    }
  }, [userStatus, userScene, loginType]);

  return (
    <View style={[styles.root, props.styles]}>
      {loginType === 'Phone Number' && (
        <Input
          type={'Phone Number'}
          title={'Phone Number'}
          value={phoneNumber}
          onValueChange={handlePhoneNumberValueChange}
          valid={phoneNumberValid}
          errMsg={phoneNumberValidErrMsg}
        />
      )}

      {loginType === 'Email' && (
        <Input
          type={'Email'}
          title={'Email'}
          value={email}
          onValueChange={handleEmailValueChange}
          valid={emailValid}
          errMsg={emailValidErrMsg}
        />
      )}

      <Input
        type={'Password'}
        title={'Password'}
        value={password}
        onValueChange={handlePasswordValueChange}
        valid={passwordValid}
        errMsg={passwordValidErrMsg}
      />

      <PrimaryButton
        text={'Login'}
        onPress={handlePress}
        styles={styles.createBtn}
        disabled={disabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'column',
    gap: 24,
  },
  createBtn: {
    marginTop: 24,
  },
});
