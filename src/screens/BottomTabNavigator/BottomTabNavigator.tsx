import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../Home/Home.tsx';
import Package from '../Package/Package.tsx';
import Inbox from '../Inbox/Inbox.tsx';
import Account from '../Account/Account.tsx';

import TabBar from './components/TabBar.tsx';

const Tab = createBottomTabNavigator();

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
