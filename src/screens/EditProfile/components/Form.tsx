import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Input from '../../../components/Input.tsx';
import {
  validateAccountName,
  validateEmail,
  validatePhoneNumber,
} from '../../../utils/validate.ts';

type Props = {
  accountName: string;
  setAccountName: (accountName: string) => void;
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
  email: string;
  setEmail: (email: string) => void;
};

export default ({
  accountName,
  setAccountName,
  phoneNumber,
  setPhoneNumber,
  email,
  setEmail,
}: Props) => {
  const [phoneNumberValid, setPhoneNumberValid] = useState<boolean>(true);
  const [accountNameValid, setAccountNameValid] = useState<boolean>(true);
  const [emailValid, setEmailValid] = useState<boolean>(true);

  const [phoneNumberValidErrMsg, setPhoneNumberValidErrMsg] =
    useState<string>('');
  const [accountNameErrMsg, setAccountNameValidErrMsg] = useState<string>('');
  const [emailValidErrMsg, setEmailValidErrMsg] = useState<string>('');

  const handlePhoneNumberValueChange = useCallback(
    (value: string) => {
      setPhoneNumber(value);

      const errMsg = validatePhoneNumber(value);
      if (errMsg) {
        setPhoneNumberValid(false);
        setPhoneNumberValidErrMsg(errMsg);
      } else {
        setPhoneNumberValid(true);
      }
    },
    [setPhoneNumber],
  );
  const handleAccountNameValueChange = useCallback(
    (value: string) => {
      setAccountName(value);

      const errMsg = validateAccountName(value);
      if (errMsg) {
        setAccountNameValid(false);
        setAccountNameValidErrMsg(errMsg);
      } else {
        setAccountNameValid(true);
      }
    },
    [setAccountName],
  );
  const handleEmailValueChange = useCallback(
    (value: string) => {
      setEmail(value);

      const errMsg = validateEmail(value);
      if (errMsg) {
        setEmailValid(false);
        setEmailValidErrMsg(errMsg);
      } else {
        setEmailValid(true);
      }
    },
    [setEmail],
  );

  useEffect(() => {
    handlePhoneNumberValueChange(phoneNumber);
    handleAccountNameValueChange(accountName);
    handleEmailValueChange(email);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.root}>
      <Input
        type={'Account Name'}
        title={'Account Name'}
        value={accountName}
        onValueChange={handleAccountNameValueChange}
        valid={accountNameValid}
        errMsg={accountNameErrMsg}
      />

      <Input
        type={'Phone Number'}
        title={'Phone Number'}
        value={phoneNumber}
        onValueChange={handlePhoneNumberValueChange}
        valid={phoneNumberValid}
        errMsg={phoneNumberValidErrMsg}
      />

      <Input
        type={'Email'}
        title={'Email'}
        value={email}
        onValueChange={handleEmailValueChange}
        valid={emailValid}
        errMsg={emailValidErrMsg}
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
});
