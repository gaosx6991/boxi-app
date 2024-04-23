import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

import Input from '../../../components/Input.tsx';
import PrimaryButton from '../../../components/PrimaryButton.tsx';
import {
  validateAccountName,
  validateEmail,
  validatePassword,
} from '../../../utils/validate.ts';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {createUserAsync, status} from '../../../store/User.ts';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigatorProps} from 'react-native-screens/lib/typescript/native-stack/types';
import Toast from 'react-native-toast-message';

type Props = {
  styles: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  const [accountName, setAccountName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [accountNameValid, setAccountNameValid] = useState<boolean>(true);
  const [emailValid, setEmailValid] = useState<boolean>(true);
  const [passwordValid, setPasswordValid] = useState<boolean>(true);

  const [accountNameErrMsg, setAccountNameValidErrMsg] = useState<string>('');
  const [emailValidErrMsg, setEmailValidErrMsg] = useState<string>('');
  const [passwordValidErrMsg, setPasswordValidErrMsg] = useState<string>('');

  const handleAccountNameValueChange = useCallback((value: string) => {
    setAccountName(value);

    const errMsg = validateAccountName(value);
    if (errMsg) {
      setAccountNameValid(false);
      setAccountNameValidErrMsg(errMsg);
    } else {
      setAccountNameValid(true);
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
    () => !accountNameValid || !emailValid || !passwordValid,
    [accountNameValid, emailValid, passwordValid],
  );

  useEffect(() => {
    handleAccountNameValueChange(accountName);
    handleEmailValueChange(email);
    handlePasswordValueChange(password);
  }, []);

  const dispatch = useAppDispatch();

  const handlePress = useCallback(() => {
    dispatch(createUserAsync({accountName, email, password}));
  }, [dispatch, accountName, email, password]);

  const userStatus = useAppSelector(status);

  const navigation = useNavigation<NativeStackNavigatorProps>();

  useEffect(() => {
    if (userStatus === 'success') {
      Toast.show({
        type: 'success',
        text1: 'User created',
        text2: 'Please login',
      });

      navigation.goBack();
    }
  }, [userStatus]);

  return (
    <View style={[styles.root, props.styles]}>
      <Input
        type={'Account Name'}
        title={'Account Name'}
        value={accountName}
        onValueChange={handleAccountNameValueChange}
        valid={accountNameValid}
        errMsg={accountNameErrMsg}
      />

      <Input
        type={'Email'}
        title={'Email'}
        value={email}
        onValueChange={handleEmailValueChange}
        valid={emailValid}
        errMsg={emailValidErrMsg}
      />

      <Input
        type={'Password'}
        title={'Password'}
        value={password}
        onValueChange={handlePasswordValueChange}
        valid={passwordValid}
        errMsg={passwordValidErrMsg}
      />

      <PrimaryButton
        text={'Create'}
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
