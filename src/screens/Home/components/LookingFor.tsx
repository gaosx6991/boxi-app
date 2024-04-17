import React, {useCallback, useMemo, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';

// @ts-ignore
import send_package from '../../../assets/send_package.png';
// @ts-ignore
import track_order from '../../../assets/track_order.png';
// @ts-ignore
import check_price from '../../../assets/check_price.png';
import LookingForItem, {Props as ItemProps} from './LookingForItem.tsx';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigatorProps} from 'react-native-screens/lib/typescript/native-stack/types';
import ScanBarcode from '../../ScanBarcode/ScanBarcode.tsx';
import {ModalScreenRef} from '../../../types';

export default () => {
  const navigation = useNavigation<NativeStackNavigatorProps>();

  const scanBarcodeRef = useRef<ModalScreenRef>(null);

  const handleSendPackagePress = useCallback(() => {
    navigation.push('CreateOrder');
  }, [navigation]);
  const handleTrackOrderPress = useCallback(() => {
    scanBarcodeRef.current?.show();
  }, [scanBarcodeRef]);
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

      <ScanBarcode ref={scanBarcodeRef} />
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
