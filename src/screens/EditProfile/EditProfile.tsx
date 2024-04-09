import React from 'react';
import Background from '../../components/Background.tsx';
import Header from '../../components/Header.tsx';
import Board from '../../components/Board.tsx';
import {StyleSheet} from 'react-native';
import Photo from './components/Photo.tsx';
import Form from './components/Form.tsx';

export default () => {
  return (
    <Background>
      <Header
        title={'Edit Profile'}
        canGoBack={true}
        rightButtonLabel={'Save'}></Header>

      <Board containerStyle={styles.board}>
        <Photo />
        <Form />
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
