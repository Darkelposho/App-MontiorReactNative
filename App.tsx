import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';
import { Login } from './src/navigator/Login';

const Appstate = ({children}: any) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <Appstate>
        <Login />
      </Appstate>    
    </NavigationContainer>
  )
}



export default App;
