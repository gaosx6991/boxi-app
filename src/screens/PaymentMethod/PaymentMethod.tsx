import React, {ForwardedRef, forwardRef, useCallback, useEffect} from 'react';

import {ModalScreenRef} from '../../types';
import ModalScreen from '../../components/ModalScreen.tsx';
import Container from './components/Container.tsx';
import ChoosePaymentMethod from './components/ChoosePaymentMethod.tsx';
import PrimaryButton from '../../components/PrimaryButton.tsx';
import {StyleSheet} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {scene, status, topUpBalanceAsync} from '../../store/Balance.ts';
import Toast from 'react-native-toast-message';
import {setBalance} from '../../store/User.ts';
import {store} from '../../store';

type Props = {
  amount: number;
};

export default forwardRef((props: Props, ref: ForwardedRef<ModalScreenRef>) => {
  const dispatch = useAppDispatch();

  const handlePress = useCallback(() => {
    dispatch(topUpBalanceAsync({receipt: props.amount.toString()}));
  }, [props.amount]);

  const statusValue = useAppSelector(status);
  const sceneValue = useAppSelector(scene);

  useEffect(() => {
    if (statusValue === 'success' && sceneValue === 'TopUp') {
      Toast.show({
        type: 'success',
        text1: 'Top up success',
        text2: 'Please enjoy',
      });

      dispatch(setBalance((store.getState().user.balance || 0) + props.amount));
    }
  }, [statusValue, sceneValue]);

  return (
    <ModalScreen title={'Payment Method'} ref={ref}>
      <Container>
        <ChoosePaymentMethod amount={props.amount.toLocaleString()} />

        <PrimaryButton
          styles={styles.button}
          text={'Continue'}
          onPress={handlePress}
        />
      </Container>
    </ModalScreen>
  );
});

const styles = StyleSheet.create({
  button: {position: 'absolute', bottom: 0},
});
