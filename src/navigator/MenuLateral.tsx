import React from 'react'
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView} from '@react-navigation/drawer';
import { SettingsScreen } from '../screens/SettingsScreen';
import { Image, Text, View } from 'react-native';
import { styles } from '../theme/appTheme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ContactScreen } from '../screens/ContactScreen';
import { DataScreen } from '../screens/DataScreen';

const Drawer = createDrawerNavigator();

export const MenuLateral = () => {
  return (
    <Drawer.Navigator
      /* drawerPosition="right" */
      drawerContent={(props) => <MenuInterno {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6788a8',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        drawerStyle: {
          backgroundColor: '#6788a8',
        },
        drawerPosition: 'right',
        drawerType: 'slide',
        drawerLabel: '',
      }}
      
    >
      <Drawer.Screen name="Datos Costa" component={DataScreen} />
      <Drawer.Screen name="Perfil" component={ContactScreen} />
      <Drawer.Screen name="Soporte" component={SettingsScreen} />     
    </Drawer.Navigator>
  );
}

const MenuInterno = ({navigation}: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView>

      {/* Parte del avatar */}
      <View style = {styles.avatarContainer}>
        <Image
          source={require('../assets/images/logo.jpeg')}
          style={ styles.Logo}
        />
      </View>

      {/* Opciones de Menu */}
      <View style={styles.menuContainer}>

        <TouchableOpacity 
          style={styles.menuBotones}
          onPress={() => navigation.navigate('Datos Costa')}
        >
          <Text style={styles.menuTexto}>Datos</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuBotones}
          onPress={() => navigation.navigate('Perfil')}  
        >
          <Text style={styles.menuTexto}>Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuBotones}
          onPress={() => navigation.navigate('Soporte')}  
        >
          <Text style={styles.menuTexto}>Soporte</Text>
        </TouchableOpacity>

      </View>
    </DrawerContentScrollView>
  );
}