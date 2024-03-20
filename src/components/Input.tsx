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
  type:
    | 'Account Name'
    | 'Email'
    | 'Password'
    | 'Phone Number'
    | 'Address'
    | 'Postal Zip';
  value: string;
  onValueChange?: (value: string) => void;
  placeholder?: string | undefined;
  valid: boolean;
  errMsg?: string;
};

const icons = {
  'Account Name': [check],
  Email: [check],
  Password: [check, visibility],
  'Phone Number': [check],
  Address: [check],
  'Postal Zip': [check],
};

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
          placeholder={props.placeholder}
        />
        {icon.map((value, index) => {
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
