import React, {ForwardedRef, forwardRef} from 'react';
import {ModalScreenRef} from '../../types';
import ModalScreen from '../../components/ModalScreen.tsx';
import Content from './components/Content.tsx';
import Form from './components/Form.tsx';

export default forwardRef(({}, ref: ForwardedRef<ModalScreenRef>) => {
  return (
    <ModalScreen title={'Security'} ref={ref}>
      <Content>
        <Form />
      </Content>
    </ModalScreen>
  );
});
