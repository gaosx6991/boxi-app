import React, {useCallback, useMemo, useState} from 'react';
import {
  Image,
  ImageStyle,
  LayoutAnimation,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// @ts-ignore
import file from '../../../assets/file.png';
// @ts-ignore
import arrow from '../../../assets/arrow.png';
import {ImageSourcePropType} from 'react-native/Libraries/Image/Image';

export enum ITEM_TYPE {
  DOCUMENT,
  DOCUMENT_1,
  DOCUMENT_2,
}

type Props = {
  checkedItemType: ITEM_TYPE;
  onPress: (type: ITEM_TYPE) => void;
};

type ItemProps = {
  type: ITEM_TYPE;
  icon: ImageSourcePropType;
  txt: string;
};

const itemTypes: ItemProps[] = [
  {
    type: ITEM_TYPE.DOCUMENT,
    icon: file,
    txt: 'Document',
  },
  {
    type: ITEM_TYPE.DOCUMENT_1,
    icon: file,
    txt: 'Document 1',
  },
  {
    type: ITEM_TYPE.DOCUMENT_2,
    icon: file,
    txt: 'Document 2',
  },
];

export default (props: Props) => {
  const [expended, setExpanded] = useState<boolean>(false);

  const data = useMemo(
    () => itemTypes.filter(value => value.type !== props.checkedItemType),
    [props.checkedItemType],
  );

  const checkedItem = useMemo(
    () => itemTypes.filter(value => value.type === props.checkedItemType)[0],
    [props.checkedItemType],
  );

  const handlePress = useCallback(() => {
    LayoutAnimation.easeInEaseOut();
    setExpanded(!expended);
  }, [expended]);

  const arrowStyle: StyleProp<ImageStyle> = useMemo(
    () => (expended ? {transform: [{rotateX: '180deg'}]} : {}),
    [expended],
  );

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.root}
      onPress={handlePress}>
      <Text style={styles.titleTxt}>Item Type</Text>
      <View style={styles.container}>
        <View style={styles.item}>
          <Image style={styles.itemIcon} source={checkedItem.icon} />
          <Text style={styles.itemTxt}>{checkedItem.txt}</Text>
          <Image style={[styles.arrowIcon, arrowStyle]} source={arrow} />
        </View>

        {expended &&
          data.map((value, index) => {
            const handleItemPress = () => {
              handlePress();
              props.onPress?.(value.type);
            };

            return (
              <TouchableOpacity key={index} onPress={handleItemPress}>
                <View style={styles.line}></View>

                <View style={styles.item}>
                  <Image style={styles.itemIcon} source={value.icon} />
                  <Text style={styles.itemTxt}>{value.txt}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
      </View>
    </TouchableOpacity>
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
  container: {
    width: '100%',
    borderRadius: 16,
    borderColor: '#DEDEDE',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
  },
  item: {
    width: '100%',
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    gap: 10,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#DEDEDE',
  },
  itemIcon: {
    width: 16,
    height: 16,
    resizeMode: 'cover',
    tintColor: '#5B57BA',
  },
  itemTxt: {
    color: '#1B1B1B',
    fontSize: 16,
    flex: 1,
  },
  arrowIcon: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
    tintColor: '#05944F',
  },
});
