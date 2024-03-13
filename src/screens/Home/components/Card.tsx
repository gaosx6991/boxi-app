import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';

import CardItem, {Props as ItemProps} from './CardItem.tsx';
// @ts-ignore
import promo_banner from '../../../assets/promo_banner.png';
// @ts-ignore
import explore_banner from '../../../assets/explore_banner.png';

export default () => {
  const items: ItemProps[] = useMemo(
    () => [
      {title: 'Promo’s Today', banner: promo_banner, onViewAllPress: () => {}},
      {
        title: 'Explore Boxi',
        banner: explore_banner,
        onViewAllPress: () => {},
      },
    ],
    [],
  );

  return (
    <View style={styles.root}>
      {items.map((value, index) => (
        <CardItem
          key={index}
          title={value.title}
          banner={value.banner}
          onViewAllPress={value.onViewAllPress}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'column',
    gap: 16,
  },
});
