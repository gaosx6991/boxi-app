import React, {useCallback, useEffect, useRef} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

// @ts-ignore
import add from '../../../assets/add.png';
import PaymentMethod from '../../PaymentMethod/PaymentMethod.tsx';
import {ModalScreenRef} from '../../../types';
import {useAppDispatch} from '../../../hooks';
import {resetScene, resetStatus} from '../../../store/Balance.ts';

type Props = {
  balance: string;
};

const amount = 249;

export default (props: Props) => {
  const paymentRef = useRef<ModalScreenRef>(null);

  const handleTopUpPress = useCallback(() => {
    paymentRef.current?.show();
  }, [paymentRef]);

  const dispatch = useAppDispatch();
  useEffect(() => {
    return () => {
      dispatch(resetScene());
      dispatch(resetStatus());
    };
  }, []);

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
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.topUp}
        onPress={handleTopUpPress}>
        <Image source={add} style={styles.addIcon} />
        <Text style={styles.topUpTxt}>Top Up</Text>
      </TouchableOpacity>

      <PaymentMethod ref={paymentRef} amount={amount} />
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
