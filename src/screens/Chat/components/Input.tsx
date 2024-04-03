import React, {useCallback, useRef, useState} from 'react';
import {
  Image,
  LayoutAnimation,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// @ts-ignore
import right_arrow from '../../../assets/right_arrow.png';

type Props = {
  onSendPress: (content: string) => void;
};

export default (props: Props) => {
  const [value, setValue] = useState<string>('');

  const inputRef = useRef<TextInput>(null);

  const handlePress = useCallback(() => {
    if (!value) {
      return;
    }

    LayoutAnimation.spring();

    setValue('');

    inputRef.current?.blur();

    props.onSendPress(value);
  }, [value, setValue, props.onSendPress, inputRef]);

  return (
    <View style={styles.root}>
      <TextInput
        multiline={true}
        style={styles.inputTxt}
        placeholder={'Type a message'}
        onChangeText={setValue}
        value={value}
        ref={inputRef}
      />

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.sendBtn}
        onPress={handlePress}>
        <Image source={right_arrow} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    minHeight: 44,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    gap: 8,
  },
  inputTxt: {
    color: '#000',
    fontSize: 16,
    flex: 1,
  },
  sendBtn: {
    backgroundColor: '#5B57BA',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
