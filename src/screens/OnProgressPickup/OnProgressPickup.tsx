import React from 'react';
import {StyleSheet} from 'react-native';
import Background from './components/Background.tsx';
import Board from './components/Board.tsx';

export default () => {
  return (
    <Background>
      <Board styles={styles.board} />
    </Background>
  );
};

const styles = StyleSheet.create({
  board: {
    position: 'absolute',
    bottom: 0,
  },
});
