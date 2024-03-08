import * as React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Onboarding from './src/screens/Onboarding/Onboarding.tsx';
import Register from './src/screens/Register/Register.tsx';

const Stack = createNativeStackNavigator();

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
