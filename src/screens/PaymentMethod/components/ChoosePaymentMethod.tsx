import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type Props = {
  amount: string;
};

export default (props: Props) => {
  return (
    <View style={styles.root}>
      <Text style={styles.titleTxt}>Choose Payment Method</Text>
      <TouchableOpacity activeOpacity={0.7} style={styles.methodItem}>
        <Text style={styles.labelTxt}>
          Boxi<Text style={styles.innerLabelTxt}>pay</Text>
        </Text>
        <Text style={styles.amountTxt}>{props.amount}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    gap: 16,
    flex: 1,
  },
  titleTxt: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000000',
  },
  methodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    width: '100%',
    height: 52,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#5B57BA',
  },
  labelTxt: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#464646',
  },
  innerLabelTxt: {
    color: '#5B57BA',
  },
  amountTxt: {
    fontSize: 15,
    color: '#464646',
  },
});
