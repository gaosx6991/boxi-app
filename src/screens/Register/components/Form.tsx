import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import Input from '../../../components/Input.tsx';
import PrimaryButton from '../../../components/PrimaryButton.tsx';

type Props = {
  styles: StyleProp<ViewStyle>;
};

function validateAccountName(accountName: string): string | null {
  // 正则表达式：账户名称只能包含字母、数字和下划线，长度在4到16个字符之间
  const regex = /^[a-zA-Z0-9_]{4,16}$/;

  if (!regex.test(accountName)) {
    // 如果不匹配，检查具体原因
    if (accountName.length < 4) {
      return 'Account name must be at least 4 characters in length';
    } else if (accountName.length > 16) {
      return 'The account name must not exceed 16 characters in length';
    } else if (!/^[a-zA-Z0-9_]+$/.test(accountName)) {
      return 'Account names can only contain letters, numbers and underscores';
    } else {
      // 如果前面的条件都不满足，但整体不匹配，则可能是其他复杂情况
      return 'Incorrectly formatted account name';
    }
  }

  return null; // 匹配成功则返回null
}

function validateEmail(email: string): string | null {
  // 正则表达式：电子邮箱地址校验
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email)) {
    // 如果不匹配，检查具体原因
    if (!/^[a-zA-Z0-9._%+-]+$/.test(email.split('@')[0])) {
      return 'The username portion of an e-mail address can only contain letters, numbers, dots, percent signs, plus signs, hyphens, and underscores.';
    } else if (
      email.split('@')[1] &&
      !/[a-zA-Z0-9.-]+$/.test(email.split('@')[1].split('.')[0])
    ) {
      return 'The domain name portion of an e-mail address can only contain letters, numbers and dots';
    } else if (!/\.[a-zA-Z]{2,}$/.test(email)) {
      return 'The e-mail address must contain a top-level domain name with at least a two-letter suffix';
    } else {
      return 'Incorrectly formatted e-mail address';
    }
  }

  return null; // 匹配成功则返回null
}

function validatePassword(password: string): string | null {
  // 正则表达式：密码必须包含至少一个小写字母、一个大写字母和一个数字，长度在8到16个字符之间
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/;

  if (!passwordRegex.test(password)) {
    // 如果不匹配，检查具体原因
    if (password.length < 8 || password.length > 16) {
      return 'Passwords must be between 8 and 16 characters in length';
    } else if (!/[a-z]/.test(password)) {
      return 'Passwords must contain at least one lowercase letter';
    } else if (!/[A-Z]/.test(password)) {
      return 'Passwords must contain at least one uppercase letter';
    } else if (!/\d/.test(password)) {
      return 'The password must contain at least one number';
    } else {
      return 'Incorrect password format';
    }
  }

  return null; // 匹配成功则返回null
}

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

  const handlePress = useCallback(() => {}, []);

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
