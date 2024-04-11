import React, {useCallback, useMemo} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

type Props = {
  text: string;
  onPress?: () => void;
  styles?: StyleProp<ViewStyle>;
  disabled?: boolean;
};

export default (props: Props) => {
  const handlePress = useCallback(() => {
    if (!props.disabled) {
      props.onPress?.();
    }
  }, [props.disabled, props.onPress]);

  const disabledStyle: StyleProp<ViewStyle> = useMemo(() => {
    return props.disabled
      ? {
          backgroundColor: '#DEDEDE',
        }
      : {};
  }, [props.disabled]);

  return (
    <TouchableOpacity
      style={[styles.btn, props.styles, disabledStyle]}
      activeOpacity={props.disabled ? 1 : 0.7}
      onPress={handlePress}>
      <Text style={styles.txt}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: '100%',
    height: 48,
    borderRadius: 10,
    backgroundColor: '#5B57BA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  txt: {
    fontSize: 16,
    color: '#FFF',
  },
});
