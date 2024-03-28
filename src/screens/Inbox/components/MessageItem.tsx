import React, {useMemo} from 'react';
import {
  Image,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import {ImageSourcePropType} from 'react-native/Libraries/Image/Image';
import {MillisecondTimestamp} from '../../../types';
import {formatTimeAgo} from '../../../utils/datetime.ts';
// @ts-ignore
import trash from '../../../assets/trash.png';

export type ItemProps = {
  id: string;
  avatar: ImageSourcePropType;
  username: string;
  message: string;
  role: 'Courier' | 'User';
  isNew?: boolean;
  timestamp: MillisecondTimestamp;
};

export type Props = {
  item: ItemProps;
};

export default ({item: props}: Props) => {
  const {width: windowWidth} = useWindowDimensions();
  const backgroundColor: StyleProp<ViewStyle> = useMemo(() => {
    return {
      backgroundColor: props.isNew ? '#5B57BA05' : '#FAFAFA',
    };
  }, [props.isNew]);

  const boxStyle: StyleProp<ViewStyle> = useMemo(() => {
    return {
      width: windowWidth,
    };
  }, [windowWidth]);

  return (
    <ScrollView
      contentContainerStyle={[styles.root, backgroundColor]}
      showsHorizontalScrollIndicator={false}
      horizontal={true}>
      <View style={[styles.box, boxStyle]}>
        <View style={styles.container}>
          <TouchableOpacity activeOpacity={0.7}>
            <Image style={styles.avatar} source={props.avatar}></Image>
          </TouchableOpacity>

          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.roleTxt}>{props.role}</Text>
              <Text style={styles.newTxt}>{props.isNew ? 'New' : ''}</Text>
              <Text style={styles.timestampTxt}>
                {formatTimeAgo(props.timestamp)}
              </Text>
            </View>
            <Text style={styles.usernameTxt}>{props.username}</Text>
            <Text
              style={styles.messageTxt}
              numberOfLines={2}
              ellipsizeMode={'tail'}>
              {props.message}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity activeOpacity={0.7} style={styles.deleteBtn}>
        <Image style={styles.deleteIcon} source={trash}></Image>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    height: 85,
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: '100%',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    gap: 12,
  },
  avatar: {
    width: 24,
    height: 24,
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  roleTxt: {
    fontWeight: 'bold',
    fontSize: 10,
    color: '#000',
  },
  newTxt: {
    fontWeight: 'bold',
    fontSize: 10,
    color: '#5B57BA',
    flex: 1,
  },
  timestampTxt: {
    fontWeight: 'bold',
    fontSize: 10,
    color: '#000',
  },
  usernameTxt: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
  },
  messageTxt: {
    marginTop: 8,
    fontSize: 12,
    color: '#464646',
  },
  deleteBtn: {
    width: 48,
    height: 75,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5B57BA',
    marginRight: 20,
  },
  deleteIcon: {
    width: 16,
    height: 16,
    resizeMode: 'cover',
  },
});
