import React, {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {Modal} from 'react-native';

import MessageList from './components/MessageList.tsx';
import Input from './components/Input.tsx';
import {ItemProps} from './components/MessageItem.tsx';
import {ChatRef, MillisecondTimestamp} from '../../types';
import ListHeader from './components/ListHeader.tsx';

export default forwardRef(({}, ref: ForwardedRef<ChatRef>) => {
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
      data.splice(0, 0, {
        id: (parseInt(data[0]['id']) + 1).toString(),
        content,
        timestamp: Date.now() as unknown as MillisecondTimestamp,
        authorIsMe: true,
      });
      setData(data);
    },
    [data, setData],
  );

  const [visible, setVisible] = useState<boolean>(false);

  const show = useCallback(() => {
    setVisible(true);
  }, [setVisible]);

  useImperativeHandle(ref, () => {
    return {show};
  });

  const handleClosePress = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  return (
    <Modal
      animationType={'slide'}
      transparent={true}
      visible={visible}
      onRequestClose={handleClosePress}>
      <ListHeader onClosePress={handleClosePress} />

      <MessageList data={data} />

      <Input onSendPress={insertMessage} />
    </Modal>
  );
});
