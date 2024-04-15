import React, {ForwardedRef, forwardRef} from 'react';

import {ModalScreenRef} from '../../types';
import ModalScreen from '../../components/ModalScreen.tsx';
import Container from './components/Container.tsx';
import Card from './components/Card.tsx';
import PaymentHistory from './components/PaymentHistory.tsx';

type Props = {
  balance: string;
};

export default forwardRef((props: Props, ref: ForwardedRef<ModalScreenRef>) => {
  return (
    <ModalScreen title={'My Balance'} ref={ref}>
      <Container>
        <Card balance={props.balance} />

        <PaymentHistory />
      </Container>
    </ModalScreen>
  );
});
