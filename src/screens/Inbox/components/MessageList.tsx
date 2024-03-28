import React, {useCallback} from 'react';
import {FlatList, StyleSheet} from 'react-native';

import MessageItem, {ItemProps} from './MessageItem.tsx';
// @ts-ignore
import photo from '../../../assets/mock/photo.png';
// @ts-ignore
import photo_1 from '../../../assets/mock/photo_1.png';
// @ts-ignore
import photo_2 from '../../../assets/mock/photo_2.png';
// @ts-ignore
import photo_3 from '../../../assets/mock/photo_3.png';
import {MillisecondTimestamp} from '../../../types';
import Header from './Header.tsx';
import ListItemSeparator from '../../../components/ListItemSeparator.tsx';

const DATA: ItemProps[] = [
  {
    id: '1',
    avatar: photo,
    role: 'Courier',
    isNew: true,
    timestamp: 1711617021360 as unknown as MillisecondTimestamp,
    username: 'Andrew Kitani',
    message: 'Hi Kitani, is the package ready to be picked up?',
  },
  {
    id: '2',
    avatar: photo_1,
    role: 'Courier',
    timestamp: 1711444436604 as unknown as MillisecondTimestamp,
    username: 'John Doessalam',
    message: 'Thanks for using Boxi sir :)',
  },
  {
    id: '3',
    avatar: photo_2,
    role: 'User',
    timestamp: 1710926055036 as unknown as MillisecondTimestamp,
    username: 'Jessica Jane',
    message:
      'Hi Kitaniiiiii, thanks for your package. i love u so much! wait my reply yap!',
  },
  {
    id: '4',
    avatar: photo_3,
    role: 'User',
    timestamp: 1651137345533 as unknown as MillisecondTimestamp,
    username: 'Felix Khan',
    message: 'i send you package, hope you like it.\n' + 'thank you Kitani.',
  },
];

export default () => {
  const renderItem = useCallback(({item}: {item: ItemProps}) => {
    return <MessageItem item={item} />;
  }, []);

  return (
    <FlatList
      ListHeaderComponent={<Header newMessageCount={1} />}
      data={DATA}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      style={styles.root}
      ItemSeparatorComponent={ListItemSeparator}></FlatList>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
