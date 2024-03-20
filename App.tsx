import * as React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Onboarding from './src/screens/Onboarding/Onboarding.tsx';
import Register from './src/screens/Register/Register.tsx';
import Login from './src/screens/Login/Login.tsx';
import type {RootStackParamList} from './src/types';
import BottomTabNavigator from './src/screens/BottomTabNavigator/BottomTabNavigator.tsx';
import CreateOrder from './src/screens/CreateOrder/CreateOrder.tsx';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
        translucent={true}
      />

      <Stack.Navigator initialRouteName={'Onboarding'}>
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false, animation: 'ios'}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false, animation: 'ios'}}
        />
        <Stack.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
          options={{headerShown: false, animation: 'ios'}}
        />
        <Stack.Screen
          name="CreateOrder"
          component={CreateOrder}
          options={{headerShown: false, animation: 'slide_from_bottom'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
