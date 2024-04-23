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
import OnProgressPickup from './src/screens/OnProgressPickup/OnProgressPickup.tsx';
import EditProfile from './src/screens/EditProfile/EditProfile.tsx';
import Loading from './src/components/Loading.tsx';
import Toast from 'react-native-toast-message';
import {useAppSelector} from './src/hooks';
import {id} from './src/store/User.ts';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const userId = useAppSelector(id);

  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
        translucent={true}
      />

      <Loading />

      <Stack.Navigator
        initialRouteName={userId ? 'BottomTabNavigator' : 'Onboarding'}>
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
          options={{headerShown: false, animation: 'ios'}}
        />
        <Stack.Screen
          name="OnProgressPickup"
          component={OnProgressPickup}
          options={{headerShown: false, animation: 'ios'}}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{headerShown: false, animation: 'ios'}}
        />
      </Stack.Navigator>

      <Toast />
    </NavigationContainer>
  );
}

export default App;
