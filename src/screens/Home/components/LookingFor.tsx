import React, {useCallback, useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';

// @ts-ignore
import send_package from '../../../assets/send_package.png';
// @ts-ignore
import track_order from '../../../assets/track_order.png';
// @ts-ignore
import check_price from '../../../assets/check_price.png';
import LookingForItem, {Props as ItemProps} from './LookingForItem.tsx';

export default () => {
  const handleSendPackagePress = useCallback(() => {}, []);
  const handleTrackOrderPress = useCallback(() => {}, []);
  const handleCheckPricePress = useCallback(() => {}, []);

  const items: ItemProps[] = useMemo(() => {
    return [
      {
        icon: send_package,
        label: 'Send Package',
        onPress: handleSendPackagePress,
      },
      {icon: track_order, label: 'Track Order', onPress: handleTrackOrderPress},
      {icon: check_price, label: 'Check Price', onPress: handleCheckPricePress},
    ];
  }, [handleSendPackagePress, handleTrackOrderPress, handleCheckPricePress]);

  return (
    <View style={styles.root}>
      <Text style={styles.titleTxt}>What are you looking for today ?</Text>

      <View style={styles.container}>
        {items.map((value, index) => (
          <LookingForItem
            key={index}
            icon={value.icon}
            label={value.label}
            onPress={value.onPress}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'column',
    gap: 16,
  },
  titleTxt: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000000',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
