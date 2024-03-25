import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import CourierInfo from './CourierInfo.tsx';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../../types';
// @ts-ignore
import recipient from '../../../assets/recipient.png';
import Info from '../../../components/Info.tsx';
// @ts-ignore
import shipper from '../../../assets/shipper.png';
import DropShadow from 'react-native-drop-shadow';

type OnProgressPickupScreenRouteProp = RouteProp<
  RootStackParamList,
  'OnProgressPickup'
>;

type Props = {
  styles: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  const route = useRoute<OnProgressPickupScreenRouteProp>();
  const {senderInfo, recipientInfo} = route.params;

  return (
    <DropShadow style={[styles.shadow, props.styles]}>
      <View style={styles.root}>
        <CourierInfo />

        <Info
          icon={shipper}
          header={senderInfo.senderName}
          subHeader={senderInfo.shipperPhoneNumber}
          detail={senderInfo.senderAddress}
        />

        <Info
          icon={recipient}
          header={recipientInfo.recipientName}
          subHeader={recipientInfo.phoneNumber}
          detail={`${recipientInfo.recipientAddress},${recipientInfo.postalZip}`}
        />
      </View>
    </DropShadow>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: -42,
    width: '100%',
  },
  root: {
    width: '100%',
    backgroundColor: '#FAFAFA',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 20,
    flexDirection: 'column',
    gap: 16,
  },
});
