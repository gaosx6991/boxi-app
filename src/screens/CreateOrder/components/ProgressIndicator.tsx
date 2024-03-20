import React, {useMemo, useState} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import ProgressIndicatorItem from './ProgressIndicatorItem.tsx';
import {PAGE} from '../common.ts';

const indicators: {type: PAGE; label: string}[] = [
  {type: PAGE.SHIPMENT_FORM, label: 'Shipment Form'},
  {type: PAGE.RECIPIENT_FORM, label: 'Recipient Form'},
  {type: PAGE.REVIEW_ORDER, label: 'Review Order'},
];

type Props = {
  page: PAGE;
};

export default (props: Props) => {
  const [lastIndicatorXAxis, setLastIndicatorXAxis] = useState(0);
  const [firstIndicatorWidth, setFirstIndicatorWidth] = useState(0);

  const lineStyle: StyleProp<ViewStyle> = useMemo(() => {
    return {
      width: lastIndicatorXAxis,
      left: firstIndicatorWidth / 2,
    };
  }, [lastIndicatorXAxis]);

  return (
    <View style={styles.root}>
      <View style={[styles.line, lineStyle]}></View>
      {indicators.map((value, index) => {
        return (
          <ProgressIndicatorItem
            key={index}
            label={value.label}
            checked={value.type <= props.page}
            setXAxis={index === 2 ? setLastIndicatorXAxis : undefined}
            setWidth={index === 0 ? setFirstIndicatorWidth : undefined}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  line: {
    position: 'absolute',
    top: 13,
    height: 1,
    zIndex: 0,
    backgroundColor: '#979797',
  },
});
