import React, {useMemo} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {MillisecondTimestamp} from '../../../types';
import DropShadow from 'react-native-drop-shadow';
import Empty from '../../../components/Empty.tsx';
import {formatDatetime} from '../../../utils/datetime.ts';

export type ItemProps = {
  id: string;
  content: string;
  timestamp: MillisecondTimestamp;
  authorIsMe?: boolean;
};

type Props = {
  item: ItemProps;
};

export default ({item: props}: Props) => {
  const wrapperStyle: StyleProp<ViewStyle> = useMemo(() => {
    return {
      shadowColor: props.authorIsMe ? '#6B67D235' : '#00000008',
    };
  }, [props.authorIsMe]);

  const containerStyle: StyleProp<ViewStyle> = useMemo(() => {
    return {
      backgroundColor: props.authorIsMe ? '#5B57BA' : '#FFFFFF',
    };
  }, [props.authorIsMe]);

  const contentTxtStyle: StyleProp<TextStyle> = useMemo(() => {
    return {
      color: props.authorIsMe ? '#FFFFFF' : '#464646',
    };
  }, [props.authorIsMe]);

  const timestampTxtStyle: StyleProp<TextStyle> = useMemo(() => {
    return {
      color: props.authorIsMe ? '#FFFFFF' : '#000000',
    };
  }, [props.authorIsMe]);

  const timestampTxt = useMemo(
    () => formatDatetime(props.timestamp),
    [props.timestamp],
  );

  return (
    <View style={styles.root}>
      {props.authorIsMe && <Empty />}

      <DropShadow style={[styles.wrapper, wrapperStyle]}>
        <View style={[styles.container, containerStyle]}>
          <Text style={[styles.contentTxt, contentTxtStyle]}>
            {props.authorIsMe && (
              <Text style={styles.timestampTxt}>{timestampTxt + ' '}</Text>
            )}
            {props.content}
            {!props.authorIsMe && (
              <Text style={[styles.timestampTxt, timestampTxtStyle]}>
                {' ' + timestampTxt}
              </Text>
            )}
          </Text>
        </View>
      </DropShadow>

      {!props.authorIsMe && <Empty />}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    paddingHorizontal: 18,
    paddingTop: 16,
    alignItems: 'center',
    flexDirection: 'row',
  },
  wrapper: {
    shadowOffset: {
      width: 0,
      height: 18,
    },
    shadowRadius: 40,
    maxWidth: '70%',
  },
  container: {
    minHeight: 55,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: 16,
    width: '100%',
  },
  contentTxt: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  timestampTxt: {
    fontWeight: 'normal',
    fontSize: 12,
  },
});
