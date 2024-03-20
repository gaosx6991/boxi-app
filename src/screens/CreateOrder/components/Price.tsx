import React, {useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const shippingAssurancePercent = 0.03;

type Props = {
  boxiRegularPrice: number;
};

export default (props: Props) => {
  const shippingAssurance = useMemo(
    () => Math.round(props.boxiRegularPrice * shippingAssurancePercent),
    [props.boxiRegularPrice, shippingAssurancePercent],
  );

  const subtotal = useMemo(
    () => props.boxiRegularPrice + shippingAssurance,
    [props.boxiRegularPrice, shippingAssurance],
  );

  return (
    <View style={styles.root}>
      <View style={styles.row}>
        <Text style={styles.keyTxt}>Boxi Regular</Text>
        <Text style={styles.valueTxt}>${props.boxiRegularPrice}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.keyTxt}>Shipping Assurance</Text>
        <Text style={styles.valueTxt}>${shippingAssurance}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.headerKeyTxt}>Subtotal</Text>
        <Text style={styles.headerValueTxt}>${subtotal}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'column',
    gap: 15,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  keyTxt: {
    fontSize: 14,
    color: '#464646',
  },
  valueTxt: {
    fontSize: 16,
    color: '#000',
  },
  headerKeyTxt: {
    fontSize: 14,
    color: '#000',
  },
  headerValueTxt: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#000',
  },
});
