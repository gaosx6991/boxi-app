import React, {useCallback} from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigatorProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {ImageSourcePropType} from 'react-native/Libraries/Image/Image';

// @ts-ignore
import back from '../assets/back.png';

type Props = {
  canGoBack?: boolean;
  title: string;
  rightButtonIcon?: ImageSourcePropType;
  rightButtonLabel?: string;
  rightButtonPress?: () => void;
  onBackPress?: () => void;
  styles?: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  const navigation = useNavigation<NativeStackNavigatorProps>();

  const handleBackPress = useCallback(() => {
    navigation.goBack();

    props.onBackPress?.();
  }, [navigation, props]);

  return (
    <View style={[styles.root, props.styles]}>
      {props.canGoBack && (
        <TouchableOpacity
          style={styles.backBtn}
          activeOpacity={0.7}
          onPress={handleBackPress}>
          <Image style={styles.backBtnImg} source={back} />
        </TouchableOpacity>
      )}

      <Text style={styles.titleTxt}>{props.title}</Text>

      {props.rightButtonIcon && (
        <TouchableOpacity
          style={styles.rightBtn}
          activeOpacity={0.7}
          onPress={props.rightButtonPress}>
          <Image style={styles.rightBtnImg} source={props.rightButtonIcon} />
        </TouchableOpacity>
      )}

      {props.rightButtonLabel && (
        <TouchableOpacity
          style={styles.rightBtn}
          activeOpacity={0.7}
          onPress={props.rightButtonPress}>
          <Text style={styles.rightBtnTxt}>{props.rightButtonLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 50,
  },
  backBtn: {
    position: 'absolute',
    left: 20,
  },
  backBtnImg: {
    width: 14,
    height: 12,
    resizeMode: 'cover',
    tintColor: '#05c84f',
  },
  titleTxt: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
  },
  rightBtn: {
    position: 'absolute',
    right: 20,
  },
  rightBtnImg: {
    width: 18,
    height: 18,
    resizeMode: 'cover',
    tintColor: '#05c84f',
  },
  rightBtnTxt: {
    fontSize: 12,
    color: '#FFF',
  },
});
