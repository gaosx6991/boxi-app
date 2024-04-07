import React from 'react';
import {StyleSheet, View} from 'react-native';
import MenuItem, {Props as ItemProps} from './MenuItem.tsx';

// @ts-ignore
import menu_icon from '../../../assets/menu_icon.png';

const itemList: ItemProps[] = [
  {icon: menu_icon, text: 'Account Settings', onPress: () => {}},
  {icon: menu_icon, text: 'Security', onPress: () => {}},
  {icon: menu_icon, text: 'My Address', onPress: () => {}},
  {icon: menu_icon, text: 'Help & FAQ', onPress: () => {}},
];

export default () => {
  return (
    <View style={styles.root}>
      {itemList.map((value, index) => (
        <MenuItem
          key={index}
          icon={value.icon}
          text={value.text}
          onPress={() => {}}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {},
});
