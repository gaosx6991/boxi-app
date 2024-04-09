import React from 'react';
import Background from '../../components/Background.tsx';
import Header from '../../components/Header.tsx';
import Board from '../../components/Board.tsx';
import ProfileCard from './components/ProfileCard.tsx';
import Statistic from './components/Statistic.tsx';
import Menu from './components/Menu.tsx';

export default () => {
  return (
    <Background>
      <Header
        rightButtonLabel={'logout'}
        rightButtonPress={() => {}}
        title={'Account'}></Header>
      <Board>
        <ProfileCard />

        <Statistic />

        <Menu />
      </Board>
    </Background>
  );
};
