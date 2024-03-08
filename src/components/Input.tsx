import React, {useCallback, useMemo, useState} from 'react';
import {
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

// @ts-ignore
import check from '../assets/check.png';
// @ts-ignore
import visibility from '../assets/visibility.png';

type Props = {
  styles?: StyleProp<ViewStyle>;
  title: string;
  type: 'Account Name' | 'Email' | 'Password';
  value: string;
  onValueChange: (value: string) => void;
  valid: boolean;
  errMsg?: string;
};

const icons = {
  'Account Name': [check],
  Email: [check],
  Password: [check, visibility],
};

function maskPassword(password: string): string {
  // 使用 Array.from 将字符串转换为字符数组
  const charArray = Array.from(password);
  // 使用 map 方法将每个字符替换为黑色实心原点
  const maskedCharArray = charArray.map(() => '•');
  // 使用 join 方法将字符数组转换回字符串
  return maskedCharArray.join('');
}

export default (props: Props) => {
  const icon = useMemo(() => icons[props.type], [icons, props.type]);
  const inputStyle: ViewStyle = useMemo(
    () => (props.valid ? {} : {borderColor: 'red', borderWidth: 2}),
    [props.valid],
  );
  const iconStyle: ImageStyle = useMemo(
    () => (props.valid ? {} : {tintColor: '#DEDEDE'}),
    [props.valid],
  );

  const [visibility, setVisibility] = useState<boolean>(false);

  const handleVisibilityPress = useCallback(() => {
    setVisibility(!visibility);
  }, [visibility]);

  const visibilityStyle: StyleProp<ImageStyle> = useMemo(
    () => (visibility ? {} : {tintColor: '#DEDEDE'}),
    [visibility],
  );

  return (
    <View style={[styles.root, props.styles]}>
      <Text style={styles.titleTxt}>{props.title}</Text>
      <View style={[styles.input, inputStyle]}>
        <TextInput
          style={styles.textInput}
          onChangeText={props.onValueChange}
          value={props.value}
          secureTextEntry={props.type === 'Password' && !visibility}
        />
        {icon.map((value, index, array) => {
          if (props.type === 'Password' && index === 1) {
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.7}
                onPress={handleVisibilityPress}>
                <Image style={[styles.icon, visibilityStyle]} source={value} />
              </TouchableOpacity>
            );
          } else {
            return (
              <Image
                key={index}
                style={[styles.icon, iconStyle]}
                source={value}
              />
            );
          }
        })}
      </View>
      {!props.valid && <Text style={styles.errMsg}>{props.errMsg}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'column',
    gap: 8,
  },
  titleTxt: {
    fontSize: 16,
    color: '#1B1B1B',
  },
  input: {
    width: '100%',
    height: 46,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#DEDEDE',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 8,
  },
  textInput: {
    fontSize: 16,
    color: '#1B1B1B',
    flex: 1,
  },
  icon: {
    width: 20,
    height: 16,
    resizeMode: 'cover',
    tintColor: '#05944F',
  },
  errMsg: {
    color: 'red',
  },
});
