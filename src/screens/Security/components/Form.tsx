import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {StyleSheet} from 'react-native';
import Input from '../../../components/Input.tsx';
import PrimaryButton from '../../../components/PrimaryButton.tsx';
import {validatePassword} from '../../../utils/validate.ts';
import {ModalScreenRefContext} from '../../../components/ModalScreenContext.ts';

export default () => {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [currentPasswordValid, setCurrentPasswordValid] =
    useState<boolean>(true);
  const [newPasswordValid, setNewPasswordValid] = useState<boolean>(true);
  const [confirmPasswordValid, setConfirmPasswordValid] =
    useState<boolean>(true);

  const [currentPasswordValidErrMsg, setCurrentPasswordValidErrMsg] =
    useState<string>('');
  const [newPasswordValidErrMsg, setNewPasswordValidErrMsg] =
    useState<string>('');
  const [confirmPasswordValidErrMsg, setConfirmPasswordValidErrMsg] =
    useState<string>('');

  const handleCurrentPasswordValueChange = useCallback(
    (value: string) => {
      setCurrentPassword(value);

      const errMsg = validatePassword(value);
      if (errMsg) {
        setCurrentPasswordValid(false);
        setCurrentPasswordValidErrMsg(errMsg);
      } else {
        setCurrentPasswordValid(true);
      }
    },
    [
      setCurrentPassword,
      setCurrentPasswordValid,
      setCurrentPasswordValidErrMsg,
    ],
  );
  const handleNewPasswordValueChange = useCallback(
    (value: string) => {
      setNewPassword(value);

      const errMsg = validatePassword(value);
      if (errMsg) {
        setNewPasswordValid(false);
        setNewPasswordValidErrMsg(errMsg);
      } else {
        setNewPasswordValid(true);
      }
    },
    [setNewPassword, setNewPasswordValid, setNewPasswordValidErrMsg],
  );
  const handleConfirmPasswordValueChange = useCallback(
    (value: string) => {
      setConfirmPassword(value);

      const errMsg = validatePassword(value);
      if (errMsg) {
        setConfirmPasswordValid(false);
        setConfirmPasswordValidErrMsg(errMsg);
      } else if (value !== newPassword) {
        setConfirmPasswordValid(false);
        setConfirmPasswordValidErrMsg('The password is not the same twice.');
      } else {
        setConfirmPasswordValid(true);
      }
    },
    [
      newPassword,
      setConfirmPassword,
      setConfirmPasswordValid,
      setConfirmPasswordValidErrMsg,
    ],
  );

  const disabled = useMemo(
    () => !currentPasswordValid || !newPasswordValid || !confirmPasswordValid,
    [currentPasswordValid, newPasswordValid, confirmPasswordValid],
  );

  useEffect(() => {
    handleCurrentPasswordValueChange(currentPassword);
    handleNewPasswordValueChange(newPassword);
    handleConfirmPasswordValueChange(confirmPassword);
  }, []);

  const ref = useContext(ModalScreenRefContext);

  const handlePress = useCallback(() => {
    ref.current?.hide();
  }, [ref]);

  return (
    <>
      <Input
        type={'Password'}
        title={'Current Password'}
        value={currentPassword}
        onValueChange={handleCurrentPasswordValueChange}
        valid={currentPasswordValid}
        errMsg={currentPasswordValidErrMsg}
      />

      <Input
        type={'Password'}
        title={'New Password'}
        value={newPassword}
        onValueChange={handleNewPasswordValueChange}
        valid={newPasswordValid}
        errMsg={newPasswordValidErrMsg}
      />

      <Input
        type={'Password'}
        title={'Confirm Password'}
        value={confirmPassword}
        onValueChange={handleConfirmPasswordValueChange}
        valid={confirmPasswordValid}
        errMsg={confirmPasswordValidErrMsg}
      />

      <PrimaryButton
        text={'Confirm'}
        onPress={handlePress}
        styles={styles.confirmBtn}
        disabled={disabled}
      />
    </>
  );
};

const styles = StyleSheet.create({
  confirmBtn: {
    marginTop: 24,
  },
});
