import React, {useCallback, useMemo} from 'react';
import {
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

type Props = {
  label: string;
  checked?: boolean;
  setXAxis?: (x: number) => void;
  setWidth?: (w: number) => void;
};

export default (props: Props) => {
  const indicatorStyle: StyleProp<ViewStyle> = useMemo(() => {
    return {
      backgroundColor: props.checked ? '#5B57BA' : '#FFFFFF',
    };
  }, [props.checked]);
  const labelTxtStyle: StyleProp<TextStyle> = useMemo(() => {
    return {
      color: props.checked ? '#000000' : '#464646',
    };
  }, [props.checked]);

  const handleLayoutChange = useCallback(
    (event: LayoutChangeEvent) => {
      props.setXAxis?.(event.nativeEvent.layout.x);
      props.setWidth?.(event.nativeEvent.layout.width);
    },
    [props.setXAxis],
  );

  return (
    <View style={styles.root} onLayout={handleLayoutChange}>
      <View style={[styles.indicator, indicatorStyle]} />
      <Text style={[styles.labelTxt, labelTxtStyle]}>{props.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'column',
    gap: 8,
    alignItems: 'center',
  },
  indicator: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 6,
    borderColor: '#EAEAEA',
  },
  labelTxt: {
    fontWeight: 'bold',
    fontSize: 10,
  },
});
