import React, {useCallback, useEffect, useState} from 'react';
import Background from '../../components/Background.tsx';
import Header from '../../components/Header.tsx';
import Board from '../../components/Board.tsx';
import {StyleSheet} from 'react-native';
import Photo from './components/Photo.tsx';
import Form from './components/Form.tsx';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {
  accountName as accountNameStore,
  avatar as avatarStore,
  email as emailStore,
  phoneNumber as phoneNumberStore,
  resetScene,
  resetStatus,
  scene,
  setAccountName as setAccountNameValue,
  setAvatar as setAvatarValue,
  setEmail as setEmailValue,
  setPhoneNumber as setPhoneNumberValue,
  setScene,
  status,
  updateUserAsync,
} from '../../store/User.ts';

export default () => {
  const avatarValue = useAppSelector(avatarStore);
  const accountNameValue = useAppSelector(accountNameStore);
  const phoneNumberValue = useAppSelector(phoneNumberStore);
  const emailValue = useAppSelector(emailStore);

  const [avatar, setAvatar] = useState<string>(avatarValue || '');
  const [accountName, setAccountName] = useState<string>(
    accountNameValue || '',
  );
  const [phoneNumber, setPhoneNumber] = useState<string>(
    phoneNumberValue || '',
  );
  const [email, setEmail] = useState<string>(emailValue || '');

  const dispatch = useAppDispatch();

  const handleSavePress = useCallback(() => {
    dispatch(setScene('UpdateUser'));
    dispatch(updateUserAsync({avatar, accountName, phoneNumber, email}));
  }, [accountName, avatar, dispatch, email, phoneNumber]);

  const sceneValue = useAppSelector(scene);
  const statusValue = useAppSelector(status);

  useEffect(() => {
    if (sceneValue === 'UpdateUser' && statusValue === 'success') {
      dispatch(setAvatarValue(avatar));
      dispatch(setAccountNameValue(accountName));
      dispatch(setPhoneNumberValue(phoneNumber));
      dispatch(setEmailValue(email));
    }
  }, [
    accountName,
    avatar,
    dispatch,
    email,
    phoneNumber,
    sceneValue,
    statusValue,
  ]);

  const handleBackPress = useCallback(() => {
    dispatch(resetStatus());
    dispatch(resetScene());
  }, [dispatch]);

  return (
    <Background>
      <Header
        title={'Edit Profile'}
        canGoBack={true}
        rightButtonLabel={'Save'}
        rightButtonPress={handleSavePress}
        onBackPress={handleBackPress}
      />

      <Board containerStyle={styles.board}>
        <Photo avatar={avatar} setAvatar={setAvatar} />
        <Form
          accountName={accountName}
          setAccountName={setAccountName}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          email={email}
          setEmail={setEmail}
        />
      </Board>
    </Background>
  );
};

const styles = StyleSheet.create({
  board: {
    alignItems: 'center',
    gap: 30,
  },
});
