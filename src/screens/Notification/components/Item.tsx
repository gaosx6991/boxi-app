import React, {useMemo} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {MillisecondTimestamp} from '../../../types';
import {formatTimeAgo} from '../../../utils/datetime.ts';

export type ItemProps = {
  id: string;
  title: string;
  isNew?: boolean;
  content: string;
  timestamp: MillisecondTimestamp;
};

type Props = {
  item: ItemProps;
};

export default ({item: props}: Props) => {
  const backgroundColor: StyleProp<ViewStyle> = useMemo(() => {
    return {backgroundColor: props.isNew ? '#5B57BA05' : 'transparent'};
  }, [props.isNew]);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.root, backgroundColor]}>
      <View style={styles.content}>
        <Text style={styles.titleTxt} numberOfLines={1} ellipsizeMode={'tail'}>
          {props.title}
        </Text>
        <Text
          style={styles.contentTxt}
          numberOfLines={2}
          ellipsizeMode={'tail'}>
          {props.content}
        </Text>
      </View>

      {props.isNew ? (
        <Text style={styles.newTxt}>New</Text>
      ) : (
        <Text style={styles.timestampTxt}>
          {formatTimeAgo(props.timestamp)}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    width: '100%',
    flexDirection: 'row',
    gap: 14,
  },
  content: {
    gap: 8,
    flex: 1,
  },
  titleTxt: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
  },
  contentTxt: {
    fontSize: 12,
    color: '#000',
  },
  newTxt: {
    fontWeight: 'bold',
    fontSize: 10,
    color: '#5B57BA',
  },
  timestampTxt: {
    fontWeight: 'bold',
    fontSize: 10,
    color: '#000',
  },
});
