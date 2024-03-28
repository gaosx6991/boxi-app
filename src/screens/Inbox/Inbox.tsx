import React from 'react';
import Header from '../../components/Header.tsx';
import Background from '../../components/Background.tsx';
import Board from './components/Board.tsx';
// @ts-ignore
import bell from '../../assets/bell.png';
import MessageList from './components/MessageList.tsx';

export default () => {
  return (
    <Background>
      <Header
        rightButtonPress={() => {}}
        title={'Inbox'}
        rightButtonIcon={bell}
      />

      <Board>
        <MessageList />
      </Board>
    </Background>
  );
};
