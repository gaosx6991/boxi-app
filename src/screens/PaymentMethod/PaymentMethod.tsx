import React, {ForwardedRef, forwardRef} from 'react';

import {ModalScreenRef} from '../../types';
import ModalScreen from '../../components/ModalScreen.tsx';
import Container from './components/Container.tsx';
import ChoosePaymentMethod from './components/ChoosePaymentMethod.tsx';
import PrimaryButton from '../../components/PrimaryButton.tsx';
import {StyleSheet} from 'react-native';

type Props = {
  amount: string;
};

export default forwardRef((props: Props, ref: ForwardedRef<ModalScreenRef>) => {
  return (
    <ModalScreen title={'Payment Method'} ref={ref}>
      <Container>
        <ChoosePaymentMethod amount={props.amount} />

        <PrimaryButton styles={styles.button} text={'Continue'} />
      </Container>
    </ModalScreen>
  );
});

const styles = StyleSheet.create({
  button: {position: 'absolute', bottom: 0},
});
