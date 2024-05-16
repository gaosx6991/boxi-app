import React, {useCallback} from 'react';
import Background from '../../components/Background.tsx';
import Header from '../../components/Header.tsx';
import Board from '../../components/Board.tsx';
import ProfileCard from './components/ProfileCard.tsx';
import Statistic from './components/Statistic.tsx';
import Menu from './components/Menu.tsx';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigatorProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {useAppDispatch} from '../../hooks';
import {LOG_OUT} from '../../store';

export default () => {
  const navigation = useNavigation<NativeStackNavigatorProps>();
  const dispatch = useAppDispatch();
  const handleRightButtonPress = useCallback(() => {
    if (dispatch) {
      dispatch({type: LOG_OUT});
    }

    navigation?.reset({
      index: 0,
      routes: [{name: 'Onboarding'}],
    });
  }, [navigation]);

  return (
    <Background>
      <Header
        rightButtonLabel={'logout'}
        rightButtonPress={handleRightButtonPress}
        title={'Account'}></Header>
      <Board>
        <ProfileCard />

        <Statistic />

        <Menu />
      </Board>
    </Background>
  );
};
