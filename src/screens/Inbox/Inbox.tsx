import React, {useCallback, useRef} from 'react';
import Header from '../../components/Header.tsx';
import Background from '../../components/Background.tsx';
import Board from './components/Board.tsx';
// @ts-ignore
import bell from '../../assets/bell.png';
import ChatList from './components/ChatList.tsx';
import Notification from '../Notification/Notification.tsx';
import {ModalScreenRef} from '../../types';

export default () => {
  const notificationRef = useRef<ModalScreenRef>(null);

  const handleRightButtonPress = useCallback(() => {
    notificationRef.current?.show();
  }, [notificationRef]);

  return (
    <Background>
      <Header
        rightButtonPress={handleRightButtonPress}
        title={'Inbox'}
        rightButtonIcon={bell}
      />

      <Board>
        <ChatList />
      </Board>

      <Notification ref={notificationRef} />
    </Background>
  );
};
