import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import Input from '../../../components/Input.tsx';
import PrimaryButton from '../../../components/PrimaryButton.tsx';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../../types';
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
} from '../../../utils/validate.ts';

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

  const handlePress = useCallback(() => {}, []);

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
