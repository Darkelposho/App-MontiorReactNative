import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext, useEffect } from 'react'
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, View } from 'react-native'
import { TextInput, TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { Logo } from '../components/Logo'
import { useForm } from '../hooks/useForm'
import { registerStyles } from '../theme/appTheme'
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any, any>{};

export const RegisterScreen = ({ navigation }: Props) => {

    const {status, signUp,errorMessage,removeError} = useContext(AuthContext);

    const {email, password, name,  onChange} = useForm ({
        name: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        if( errorMessage.length === 0 ) {
            return
        }
        Alert.alert( 'Registro incorrecto', errorMessage,[{
            text: 'Ok',
            onPress: removeError
        }]);

    }, [ errorMessage ])

    const onRegisterPress = () => {
        /* navigation.navigate('MenuScreen'); */
        console.log({name, email, password});
        Keyboard.dismiss();

        signUp({name, email, password});
        console.log(status);
    }

    return (   
        <ScrollView>
            <KeyboardAvoidingView 
                style={registerStyles.container} 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                {/* Keyboard avoid view */}
                <Logo/>

                <Text style={ registerStyles.title }>Registro</Text>

                <Text style={ registerStyles.label }>Nombre:</Text>

                <TextInput 
                    style={registerStyles.input} 
                    placeholder="Nombre" 
                    placeholderTextColor="#6788a8" 
                    underlineColorAndroid="#6788a8" 
                    onChangeText={(text) => onChange(text, 'name')}
                    value={name}
                    selectionColor="#6788a8"
                    autoCapitalize="words"
                    autoCorrect={false}
                />
                <Text style={ registerStyles.label }>Email:</Text>
                <TextInput 
                    style={registerStyles.input} 
                    placeholder="Ingrese su email:" 
                    placeholderTextColor="#6788a8" 
                    underlineColorAndroid="#6788a8"
                    onChangeText={(text) => onChange(text, 'email')}
                    value={email}
                    selectionColor="#6788a8"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <Text style={ registerStyles.label }>Contraseña</Text>
                <TextInput 
                    style={registerStyles.input} 
                    placeholder="******" 
                    placeholderTextColor="#6788a8" 
                    underlineColorAndroid="#6788a8"
                    secureTextEntry
                    onChangeText={(text) => onChange(text, 'password')}
                    selectionColor="#6788a8"
                    value={password}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <View style={registerStyles.buttonContainer}>
                    <TouchableOpacity 
                        style={registerStyles.button} 
                        onPress={onRegisterPress}
                    >
                        <Text style={registerStyles.buttonText}>Registrarse</Text>
                    </TouchableOpacity>
                </View>

                <View style={registerStyles.buttonContainer}>  
                    <TouchableOpacity
                        style={registerStyles.buttonReturn}
                        onPress={() => navigation.replace('LoginScreen')}
                        activeOpacity={0.7}
                        
                    >
                        <Text style={registerStyles.buttonText}>¿Ya tienes cuenta?, Inicia Sesion</Text>
                    </TouchableOpacity>
                </View>
                
            </KeyboardAvoidingView>
        </ScrollView> 
        
    )
}
