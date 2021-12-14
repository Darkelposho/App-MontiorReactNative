import React, { useContext } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { MenuLateral } from './MenuLateral';
import { RegisterScreen } from '../screens/RegisterScreen';
import { AuthContext } from '../context/AuthContext';
import { LoadingScreen } from '../screens/LoadingScreen';

const Stack = createStackNavigator();

export const Login = () => {

  const {status} = useContext (AuthContext);

  if (status === 'cheking') return <LoadingScreen/>;

  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{
        headerShown: false,
        headerStyle: {
          elevation: 0,
          shadowColor: 'transparent'
        },
        cardStyle: {
          backgroundColor: 'white'
        }
      }}
    >
      {
        (status === 'authenticated')  
        ? (
          <Stack.Screen name="MenuScreen"  component={ MenuLateral } />
        ) 
        : (status === 'semi-authenticated')
        ? (
          <Stack.Screen name="LoginScreen" component={ LoginScreen } />
        )
        : (
          <>
            <Stack.Screen name="LoginScreen" component={ LoginScreen } />
            <Stack.Screen name="RegisterScreen"  component={ RegisterScreen } />
          </>
        )
      }
    </Stack.Navigator>
  );
}