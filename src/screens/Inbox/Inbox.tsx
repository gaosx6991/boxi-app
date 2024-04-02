import React from 'react';
import Header from '../../components/Header.tsx';
import Background from '../../components/Background.tsx';
import Board from './components/Board.tsx';
// @ts-ignore
import bell from '../../assets/bell.png';
import ChatList from './components/ChatList.tsx';

export default () => {
  return (
    <Background>
      <Header
        rightButtonPress={() => {}}
        title={'Inbox'}
        rightButtonIcon={bell}
      />

      <Board>
        <ChatList />
      </Board>
    </Background>
  );
};
