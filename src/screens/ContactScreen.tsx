import React, { useContext } from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { ScrollView} from 'react-native-gesture-handler';
import { AuthContext } from '../context/AuthContext';
import { ContactStyles } from '../theme/appTheme'; 

export const ContactScreen = () => {

    const {user, logOut} = useContext(AuthContext);   

    return (
        <ScrollView>
            <View style={ContactStyles.container}>
                <View style={ContactStyles.avatarContainer}>
                    <Image
                        source={{uri:'https://www.softzone.es/app/uploads-softzone.es/2018/04/guest.png?x=480&quality=20'}}
                        style={ContactStyles.avatar}
                    />
                </View>
                <View style={ContactStyles.infoContainer}>
                    <Text style={ContactStyles.title}>
                        Datos:
                    </Text>
                    <Text style={ContactStyles.text}>Nombre: {user.nombre}</Text>
                    <Text style={ContactStyles.text}>
                        Email: {user.correo}
                    </Text>
                    <Text style={ContactStyles.text}>
                        Rol: {user.rol}
                    </Text>
                </View>

                <View style={ContactStyles.buttonContainer}>
                    <TouchableOpacity
                        style={ContactStyles.button}
                        onPress={logOut}
                    >
                        <Text style={ContactStyles.buttonText}>
                            Cerrar Sesión
                        </Text>
                    </TouchableOpacity>
                </View>

                
                {/* <Text style={ContactStyles.title}>{JSON.stringify(user, null, 5)}</Text>
                <Text style={ContactStyles.title}>{token}</Text> */}
            </View>
        </ScrollView>
        
    );
};