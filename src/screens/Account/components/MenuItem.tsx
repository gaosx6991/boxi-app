import React, {useMemo} from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import {ImageSourcePropType} from 'react-native/Libraries/Image/Image';

// @ts-ignore
import arrow from '../../../assets/forward.png';

export type Props = {
  icon: ImageSourcePropType;
  text: string;
  onPress: () => void;
};

export default (props: Props) => {
  const {width: windowWidth} = useWindowDimensions();

  const borderStyle: StyleProp<ViewStyle> = useMemo(() => {
    return {
      width: windowWidth - 24 - 16 - 20 * 2,
    };
  }, [windowWidth]);

  return (
    <View style={styles.root}>
      <Image source={props.icon} style={styles.icon} />
      <Text style={styles.text}>{props.text}</Text>

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.arrowBtn}
        onPress={props.onPress}>
        <Image style={styles.arrowIcon} source={arrow} />
      </TouchableOpacity>

      <View style={[styles.border, borderStyle]}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'cover',
    tintColor: '#5B57BA',
  },
  text: {
    fontSize: 16,
    color: '#000',
    flex: 1,
  },
  arrowBtn: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowIcon: {
    tintColor: '#5B57BA',
  },
  border: {
    height: 1,
    backgroundColor: '#E2E2E2',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});
