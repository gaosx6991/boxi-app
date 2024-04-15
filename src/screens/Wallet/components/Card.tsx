import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

// @ts-ignore
import add from '../../../assets/add.png';

type Props = {
  balance: string;
};

export default (props: Props) => {
  return (
    <View style={styles.root}>
      <View style={styles.myBalance}>
        <Text style={styles.myBalanceTitleTxt}>My Balance</Text>
        <Text
          style={styles.myBalanceNumberTxt}
          ellipsizeMode={'tail'}
          numberOfLines={1}>
          ${props.balance}
        </Text>
      </View>
      <TouchableOpacity activeOpacity={0.7} style={styles.topUp}>
        <Image source={add} style={styles.addIcon} />
        <Text style={styles.topUpTxt}>Top Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 58,
    gap: 8,
    flexDirection: 'row',
  },
  myBalance: {
    flex: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    gap: 4,
    backgroundColor: '#5B57BA',
  },
  myBalanceTitleTxt: {
    fontWeight: 'bold',
    fontSize: 10,
    color: '#FFF',
  },
  myBalanceNumberTxt: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FFF',
  },
  topUp: {
    height: '100%',
    width: 58,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5B57BA',
    gap: 4,
  },
  addIcon: {
    width: 18,
    height: 18,
    resizeMode: 'cover',
    tintColor: '#FAFAFA',
  },
  topUpTxt: {
    fontWeight: 'bold',
    fontSize: 10,
    color: '#FFF',
  },
});
