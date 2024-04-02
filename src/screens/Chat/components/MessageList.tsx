import React, {useCallback} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import MessageItem, {ItemProps} from './MessageItem.tsx';

type Props = {
  data: ItemProps[];
};

export default (props: Props) => {
  const renderItem = useCallback(({item}: {item: ItemProps}) => {
    return <MessageItem item={item} />;
  }, []);

  return (
    <FlatList
      ListHeaderComponent={<View style={{height: 44 + 16}} />}
      inverted={true}
      data={props.data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      style={styles.root}
      showsVerticalScrollIndicator={false}></FlatList>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
});
