import React from 'react';
// @ts-ignore
import bell from '../../assets/bell.png';
import Header from '../../components/Header.tsx';
import Background from '../../components/Background.tsx';
import {StyleSheet} from 'react-native';
import Balance from './components/Balance.tsx';
import Board from './components/Board.tsx';
import LookingFor from './components/LookingFor.tsx';
import Card from './components/Card.tsx';

export default () => {
  return (
    <Background>
      <Header
        rightButtonPress={() => {}}
        title={'Boxi'}
        rightButtonIcon={bell}
      />

      <Balance styles={styles.balance}>
        <Board>
          <LookingFor />

          <Card />
        </Board>
      </Balance>
    </Background>
  );
};

const styles = StyleSheet.create({
  balance: {
    marginTop: 16,
  },
});
