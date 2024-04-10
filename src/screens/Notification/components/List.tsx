import {SectionList, StyleSheet} from 'react-native';
import Item, {ItemProps} from './Item.tsx';
import React, {useCallback} from 'react';
import Header from './Header.tsx';

export type ListProps = {
  title: string;
  data: ItemProps[];
};

type Props = {
  data: ListProps[];
};

export default (props: Props) => {
  const renderItem = useCallback(
    ({item}: {item: ItemProps}) => <Item item={item} />,
    [],
  );

  const renderHeader = useCallback(({section}: {section: ListProps}) => {
    return <Header title={section.title} />;
  }, []);

  return (
    <SectionList
      style={styles.root}
      sections={props.data}
      keyExtractor={(item, index) => `${item.id} + ${index}`}
      renderItem={renderItem}
      renderSectionHeader={renderHeader}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
});
