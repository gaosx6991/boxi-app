import React from 'react';
import {LayoutAnimation, StyleSheet, Text, View} from 'react-native';

// @ts-ignore
import envelope from '../../../assets/envelope.png';
// @ts-ignore
import box from '../../../assets/box.png';
// @ts-ignore
import cargo from '../../../assets/cargo.png';
import PackageSizeItem, {PACKAGE_SIZE} from './PackageSizeItem.tsx';

export const packageSizes = [
  {
    size: PACKAGE_SIZE.ENVELOPE,
    icon: envelope,
    label: '< 1kg',
    name: 'Envelope',
    price: 20.23,
  },
  {
    size: PACKAGE_SIZE.BOX,
    icon: box,
    label: '3kg - 10kg',
    name: 'Box',
    price: 40.23,
  },
  {
    size: PACKAGE_SIZE.CARGO,
    icon: cargo,
    label: '> 10kg',
    name: 'Cargo',
    price: 60.23,
  },
];

type Props = {
  checkedSize: PACKAGE_SIZE;
  onPress: (size: PACKAGE_SIZE) => void;
};

export default (props: Props) => {
  return (
    <View style={styles.root}>
      <Text style={styles.titleTxt}>Package Size</Text>
      <View style={styles.container}>
        {packageSizes.map((value, index) => {
          const handlePress = () => {
            LayoutAnimation.easeInEaseOut();
            props.onPress(value.size);
          };

          return (
            <PackageSizeItem
              key={index}
              label={value.label}
              icon={value.icon}
              checked={value.size === props.checkedSize}
              size={value.size}
              onPress={handlePress}
            />
          );
        })}
      </View>
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
  container: {
    width: '100%',
    flexDirection: 'row',
    gap: 18,
  },
});
