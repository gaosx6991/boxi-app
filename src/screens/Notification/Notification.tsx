import React, {ForwardedRef, forwardRef, useEffect, useState} from 'react';

import {MillisecondTimestamp, ModalScreenRef} from '../../types';
import ModalScreen from '../../components/ModalScreen.tsx';
import List, {ListProps} from './components/List.tsx';

export default forwardRef(({}, ref: ForwardedRef<ModalScreenRef>) => {
  const [data, setData] = useState<ListProps[]>([]);

  useEffect(() => {
    setData([
      {
        title: 'Order',
        data: [
          {
            id: '1',
            title: 'Your package ready to pickup soon.',
            isNew: true,
            content:
              'Order BX-71720 is already to pickup on 5:20 PM, Hi Kitani, please prepare your package thank you!',
            timestamp: 1711617021360 as unknown as MillisecondTimestamp,
            type: 'Normal',
          },
        ],
      },
      {
        title: 'For You',
        data: [
          {
            id: '1',
            title: 'Congratulation, top up successfully.',
            content: 'Your transaction top up $50,00 is success',
            timestamp: 1711444436604 as unknown as MillisecondTimestamp,
            type: 'Normal',
          },
          {
            id: '2',
            title: 'Update Announcement',
            content: 'Boxi version 2.1.8',
            timestamp: 1710926055036 as unknown as MillisecondTimestamp,
            type: 'Update',
          },
        ],
      },
    ]);
  }, []);

  return (
    <ModalScreen title={'Notification'} ref={ref}>
      <List data={data} />
    </ModalScreen>
  );
});
