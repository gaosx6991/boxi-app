import React, {useCallback} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

type Props = {
  styles: StyleProp<ViewStyle>;
  content: string;
  timestamp: string;
};

export default (props: Props) => {
  const handlePress = useCallback(() => {}, []);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.root, props.styles]}
      onPress={handlePress}>
      <Text style={styles.txt}>{props.content}</Text>
      <Text style={styles.txt}>{props.timestamp}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 30,
    backgroundColor: '#5B57BA',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txt: {
    fontSize: 14,
    color: '#FFF',
  },
});
