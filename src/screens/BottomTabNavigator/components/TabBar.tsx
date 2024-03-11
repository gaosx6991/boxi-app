import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs/src/types.tsx';
// @ts-ignore
import homeIcon from '../../../assets/home.png';
// @ts-ignore
import packageIcon from '../../../assets/package.png';
// @ts-ignore
import inboxIcon from '../../../assets/inbox.png';
// @ts-ignore
import accountIcon from '../../../assets/account.png';

type ScreenName = 'Home' | 'Package' | 'Inbox' | 'Account';

const icons = {
  Home: homeIcon,
  Package: packageIcon,
  Inbox: inboxIcon,
  Account: accountIcon,
};

export default ({state, descriptors, navigation}: BottomTabBarProps) => {
  return (
    <View style={styles.root}>
      {state.routes.map((route, index) => {
        const screenName = route.name as ScreenName;
        const {options} = descriptors[route.key];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.btn}
            key={index}>
            <Image
              source={icons[screenName]}
              style={[
                styles.img,
                {tintColor: isFocused ? '#5B57BA' : '#C3C3C3'},
              ]}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 56,
    backgroundColor: '#FAFAFA',
    flexDirection: 'row',
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 32,
    height: 32,
    resizeMode: 'cover',
  },
});
