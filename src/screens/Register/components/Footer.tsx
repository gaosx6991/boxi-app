import React from 'react';
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
import google from '../../../assets/google.png';
// @ts-ignore
import black from '../../../assets/black.png';

type Props = {
  styles: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  return (
    <View style={[styles.root, props.styles]}>
      <Text style={styles.txt}>or with social media</Text>

      <View style={styles.btnGroup}>
        <TouchableOpacity activeOpacity={0.7} style={styles.btn}>
          <Image source={google} style={styles.img} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={styles.btn}>
          <Image source={black} style={styles.img} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 24,
  },
  txt: {
    fontSize: 12,
    color: '#000',
  },
  btnGroup: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  btn: {
    flex: 1,
    height: 48,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#DEDEDE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 24,
    height: 24,
    resizeMode: 'cover',
  },
});
