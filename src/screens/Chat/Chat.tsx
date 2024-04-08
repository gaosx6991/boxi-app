import React, {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from 'react';

import MessageList from './components/MessageList.tsx';
import Input from './components/Input.tsx';
import {ItemProps} from './components/MessageItem.tsx';
import {MillisecondTimestamp, ModalScreenRef} from '../../types';
import ModalScreen from '../../components/ModalScreen.tsx';
// @ts-ignore
import photo_3 from '../../assets/mock/photo_3.png';
import Info from './components/Info.tsx';

export default forwardRef(({}, ref: ForwardedRef<ModalScreenRef>) => {
  const [data, setData] = useState<ItemProps[]>([]);

  useEffect(() => {
    setData([
      {
        id: '13',
        content:
          '233 i send you package, hope you like it.thank you Kitani123.',
        timestamp: 1710926055036 as unknown as MillisecondTimestamp,
      },
      {
        id: '12',
        content: 'i send you package, hope you like it.thank you Kitani.',
        timestamp: 1710926055036 as unknown as MillisecondTimestamp,
        authorIsMe: true,
      },
      {
        id: '11',
        content: 'i send you package, hope you like it.thank you Kitani.',
        timestamp: 1710926055036 as unknown as MillisecondTimestamp,
      },
      {
        id: '10',
        content: 'i send you package, hope you like it.thank you Kitani.',
        timestamp: 1710926055036 as unknown as MillisecondTimestamp,
        authorIsMe: true,
      },
      {
        id: '9',
        content: 'i send you package, hope you like it.thank you Kitani.',
        timestamp: 1710926055036 as unknown as MillisecondTimestamp,
      },
      {
        id: '8',
        content: 'i send you package, hope you like it.thank you Kitani.',
        timestamp: 1710926055036 as unknown as MillisecondTimestamp,
        authorIsMe: true,
      },
      {
        id: '7',
        content: 'i send you package, hope you like it.thank you Kitani.',
        timestamp: 1710926055036 as unknown as MillisecondTimestamp,
      },
      {
        id: '6',
        content: 'i send you package, hope you like it.thank you Kitani.',
        timestamp: 1710926055036 as unknown as MillisecondTimestamp,
        authorIsMe: true,
      },
      {
        id: '5',
        content: 'i send you package, hope you like it.thank you Kitani.',
        timestamp: 1710926055036 as unknown as MillisecondTimestamp,
      },
      {
        id: '4',
        content: 'i send you package, hope you like it.thank you Kitani.',
        timestamp: 1710926055036 as unknown as MillisecondTimestamp,
        authorIsMe: true,
      },
      {
        id: '3',
        content: 'i send you package, hope you like it.thank you Kitani.',
        timestamp: 1710926055036 as unknown as MillisecondTimestamp,
      },
      {
        id: '2',
        content: 'Oh Hi!',
        authorIsMe: true,
        timestamp: 1711444436604 as unknown as MillisecondTimestamp,
      },
      {
        id: '1',
        content: 'Hello Kitani',
        timestamp: 1711617021360 as unknown as MillisecondTimestamp,
      },
    ]);
  }, []);

  const insertMessage = useCallback(
    (content: string) => {
      setData(prevState => {
        return [
          {
            id: (parseInt(prevState[0]['id']) + 1).toString(),
            content,
            timestamp: Date.now() as unknown as MillisecondTimestamp,
            authorIsMe: true,
          },
          ...prevState,
        ];
      });
    },
    [setData],
  );

  return (
    <ModalScreen title={'Felix Khan'} ref={ref}>
      <Info
        role={'User'}
        username={'Felix Khan'}
        avatar={photo_3}
        online={Date.now() as unknown as MillisecondTimestamp}
      />

      <MessageList data={data} />

      <Input onSendPress={insertMessage} />
    </ModalScreen>
  );
});
