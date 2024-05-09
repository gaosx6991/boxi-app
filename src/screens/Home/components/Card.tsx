import React, {useCallback, useMemo, useRef} from 'react';
import {StyleSheet, View} from 'react-native';

import CardItem, {Props as ItemProps} from './CardItem.tsx';
// @ts-ignore
import explore_banner from '../../../assets/explore_banner.png';
import PromoDetail from '../../PromoDetail/PromoDetail.tsx';
import {ModalScreenRef} from '../../../types';
import {useAppSelector} from '../../../hooks';
import {promoToday} from '../../../store/Promo.ts';

export default () => {
  const ref = useRef<ModalScreenRef>(null);
  const handlePromoPress = useCallback(() => {
    ref.current?.show();
  }, [ref]);

  const promoTodayValue = useAppSelector(promoToday);

  const items: ItemProps[] = useMemo(
    () =>
      promoTodayValue
        ? [
            {
              title: 'Promo’s Today',
              banner: {uri: promoTodayValue.cover},
              onViewAllPress: handlePromoPress,
            },
            {
              title: 'Explore Boxi',
              banner: explore_banner,
              onViewAllPress: () => {},
            },
          ]
        : [
            {
              title: 'Explore Boxi',
              banner: explore_banner,
              onViewAllPress: () => {},
            },
          ],
    [handlePromoPress, promoTodayValue],
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

      <PromoDetail ref={ref} />
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
