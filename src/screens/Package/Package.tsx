import React from 'react';
import Header from '../../components/Header.tsx';
import Background from '../../components/Background.tsx';
import Board from './components/Board.tsx';
import TopTabNavigator from './components/TopTabNavigator.tsx';

export default () => {
  return (
    <Background>
      <Header title={'My Activity'} />

      <Board>
        <TopTabNavigator />
      </Board>
    </Background>
  );
};
