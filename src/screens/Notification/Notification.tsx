import React, {ForwardedRef, forwardRef} from 'react';

import {ModalScreenRef} from '../../types';
import ModalScreen from '../../components/ModalScreen.tsx';
import List from './components/List.tsx';

export default forwardRef(({}, ref: ForwardedRef<ModalScreenRef>) => {
  return (
    <ModalScreen title={'Notification'} ref={ref}>
      <List />
    </ModalScreen>
  );
});
