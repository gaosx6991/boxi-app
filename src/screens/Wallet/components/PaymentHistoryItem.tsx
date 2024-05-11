import React, {useMemo} from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

// @ts-ignore
import up_arrow from '../../../assets/up_arrow.png';
// @ts-ignore
import down_arrow from '../../../assets/down_arrow.png';
import {formatUnixTimestampToDateString} from '../../../utils/datetime.ts';
import {PaymentHistoryListItem} from '../../../apis/Balance.ts';
import {MillisecondTimestamp} from '../../../types';

type Props = {
  item: PaymentHistoryListItem;
};

export default ({item: props}: Props) => {
  const iconContainerStyle: StyleProp<ViewStyle> = useMemo(
    () =>
      props.direction === 'Pay Out'
        ? {backgroundColor: '#5B57BA20'}
        : {backgroundColor: '#7DE0C820'},
    [props.direction],
  );

  const formattedAmount = useMemo(
    () => props.amount.toLocaleString(),
    [props.amount],
  );

  const amountTxtStyle: StyleProp<TextStyle> = useMemo(
    () =>
      props.direction === 'Pay Out' ? {color: '#000'} : {color: '#08C25E'},
    [props.direction],
  );

  return (
    <View style={styles.root}>
      <View style={[styles.iconContainer, iconContainerStyle]}>
        <Image
          style={styles.icon}
          source={props.direction === 'Pay Out' ? up_arrow : down_arrow}
        />
      </View>
      <View style={styles.middle}>
        <Text style={styles.titleTxt}>{props.title}</Text>
        <Text style={styles.descriptionTxt}>{props.description}</Text>
      </View>
      <View style={styles.right}>
        <Text style={[styles.amountTxt, amountTxtStyle]}>
          {props.direction === 'Pay Out' ? '-' : ''}${formattedAmount}
        </Text>
        <Text style={styles.datetimeTxt}>
          {formatUnixTimestampToDateString(
            props.timestamp as unknown as MillisecondTimestamp,
          )}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  iconContainer: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 12,
    height: 16,
    resizeMode: 'cover',
  },
  middle: {
    flex: 1,
    gap: 2,
  },
  titleTxt: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
  },
  descriptionTxt: {
    fontSize: 10,
    color: '#000000',
  },
  right: {
    gap: 2,
  },
  amountTxt: {
    fontSize: 12,
  },
  datetimeTxt: {
    fontSize: 10,
    color: '#000000',
  },
});
