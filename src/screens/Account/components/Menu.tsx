import React, {useCallback, useMemo, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import MenuItem, {Props as ItemProps} from './MenuItem.tsx';

// @ts-ignore
import menu_icon from '../../../assets/menu_icon.png';
import {ModalScreenRef} from '../../../types';
import Security from '../../Security/Security.tsx';
import {ModalScreenRefContext} from '../../../components/ModalScreenContext.ts';

export default () => {
  const securityRef = useRef<ModalScreenRef>(null);

  const handleSecurityPress = useCallback(() => {
    securityRef.current?.show();
  }, [securityRef]);

  const itemList: ItemProps[] = useMemo(() => {
    return [
      {icon: menu_icon, text: 'Account Settings', onPress: () => {}},
      {icon: menu_icon, text: 'Security', onPress: handleSecurityPress},
      {icon: menu_icon, text: 'My Address', onPress: () => {}},
      {icon: menu_icon, text: 'Help & FAQ', onPress: () => {}},
    ];
  }, [handleSecurityPress]);

  return (
    <View style={styles.root}>
      {itemList.map((value, index) => (
        <MenuItem
          key={index}
          icon={value.icon}
          text={value.text}
          onPress={value.onPress}
        />
      ))}

      <ModalScreenRefContext.Provider value={securityRef}>
        <Security ref={securityRef} />
      </ModalScreenRefContext.Provider>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {},
});
