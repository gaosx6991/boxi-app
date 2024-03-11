import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../Home/Home.tsx';
import Package from '../Package/Package.tsx';
import Inbox from '../Inbox/Inbox.tsx';
import Account from '../Account.tsx';

// @ts-ignore
import homeIcon from '../../assets/home.png';
// @ts-ignore
import packageIcon from '../../assets/package.png';
// @ts-ignore
import inboxIcon from '../../assets/inbox.png';
// @ts-ignore
import accountIcon from '../../assets/account.png';
import TabBar from './components/TabBar.tsx';

const Tab = createBottomTabNavigator();

const icons = {
  Home: homeIcon,
  Package: packageIcon,
  Inbox: inboxIcon,
  Account: accountIcon,
};

export default () => {
  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      tabBar={props => <TabBar {...props} />}>
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Tab.Screen
        name="Package"
        component={Package}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Inbox"
        component={Inbox}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};
