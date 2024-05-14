import React, {useCallback, useEffect, useRef} from 'react';
// @ts-ignore
import bell from '../../assets/bell.png';
import Header from '../../components/Header.tsx';
import Background from '../../components/Background.tsx';
import {StyleSheet} from 'react-native';
import Balance from './components/Balance.tsx';
import Board from './components/Board.tsx';
import LookingFor from './components/LookingFor.tsx';
import Card from './components/Card.tsx';
import {useAppDispatch} from '../../hooks';
import {
  getPromoTodayAsync,
  resetScene as resetPromoScene,
  resetStatus as resetPromoStatus,
} from '../../store/Promo.ts';
import {ModalScreenRef} from '../../types';
import Notification from '../Notification/Notification.tsx';

export default () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPromoTodayAsync());

    return () => {
      dispatch(resetPromoStatus());
      dispatch(resetPromoScene());
    };
  }, []);

  const notificationRef = useRef<ModalScreenRef>(null);
  const handleRightButtonPress = useCallback(() => {
    notificationRef.current?.show();
  }, [notificationRef]);

  return (
    <Background>
      <Header
        rightButtonPress={handleRightButtonPress}
        title={'Boxi'}
        rightButtonIcon={bell}
      />

      <Balance styles={styles.balance}>
        <Board>
          <LookingFor />

          <Card />
        </Board>
      </Balance>

      <Notification ref={notificationRef} />
    </Background>
  );
};

const styles = StyleSheet.create({
  balance: {
    marginTop: 16,
  },
});
