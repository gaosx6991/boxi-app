import React, {PropsWithChildren, useCallback, useMemo, useRef} from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

// @ts-ignore
import balance from '../../../assets/balance.png';
import Wallet from '../../Wallet/Wallet.tsx';
import {ModalScreenRef} from '../../../types';
import {useAppSelector} from '../../../hooks';
import {balance as amount} from '../../../store/User.ts';

type Props = PropsWithChildren & {
  styles: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  const amountValue = useAppSelector(amount) || 0;
  const formattedAmount = useMemo(
    () => amountValue.toLocaleString(),
    [amountValue],
  );

  const walletRef = useRef<ModalScreenRef>(null);

  const handlePress = useCallback(() => {
    walletRef.current?.show();
  }, [walletRef]);

  return (
    <View style={[styles.root, props.styles]}>
      <View style={styles.balance}>
        <Image source={balance} style={styles.img} />
        <Text style={styles.amountTxt} ellipsizeMode={'tail'} numberOfLines={1}>
          ${formattedAmount}
        </Text>
        <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
          <Text style={styles.btnTxt}>View Boxipay</Text>
        </TouchableOpacity>
      </View>
      {props.children}

      <Wallet ref={walletRef} balance={formattedAmount} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#4B47A3',
  },
  balance: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    height: 56,
    paddingHorizontal: 20,
  },
  img: {
    width: 22,
    height: 20,
    resizeMode: 'cover',
    tintColor: '#FAFAFA',
  },
  amountTxt: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
    flex: 1,
  },
  btnTxt: {
    color: '#FFFFFF',
  },
});
