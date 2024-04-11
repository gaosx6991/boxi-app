import React, {useCallback, useMemo, useRef} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {MillisecondTimestamp, ModalScreenRef} from '../../../types';
import {formatTimeAgo} from '../../../utils/datetime.ts';
import NotificationDetail from '../../NotificationDetail/NotificationDetail.tsx';

export type ItemProps = {
  id: string;
  title: string;
  isNew?: boolean;
  content: string;
  type: 'Normal' | 'Update';
  timestamp: MillisecondTimestamp;
};

type Props = {
  item: ItemProps;
};

export default ({item: props}: Props) => {
  const backgroundColor: StyleProp<ViewStyle> = useMemo(() => {
    return {backgroundColor: props.isNew ? '#5B57BA05' : 'transparent'};
  }, [props.isNew]);

  const ref = useRef<ModalScreenRef>(null);

  const handlePress = useCallback(() => {
    ref.current?.show();
  }, [ref]);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.root, backgroundColor]}
      onPress={handlePress}>
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

      <NotificationDetail ref={ref} title={props.title} type={props.type} />
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
