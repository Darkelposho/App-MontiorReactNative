import React, { useContext, useEffect } from 'react'
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Backgound } from '../components/Backgound';
import { Logo } from '../components/Logo';
import { loginStyles } from '../theme/appTheme';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';


interface Props extends StackScreenProps<any, any>{};

export const LoginScreen = ({ navigation }: Props ) => {

    const{status, signIn, errorMessage, removeError} = useContext(AuthContext);

    

    const {email, password, onChange} = useForm ({
        email: '',
        password: '',
    });

    useEffect(() => {
        if(errorMessage.length === 0) return;

        Alert.alert('Login Incorrecto', errorMessage, [{
            text: 'Ok', 
            onPress:  removeError
        }]);

    }, [errorMessage]);


    const onLoginPress = () => {
        console.log({email, password});
        Keyboard.dismiss();

        signIn({email, password});
        console.log(status);
    }

    return (
        <>
            {/* Background */}
            <Backgound/>

            <KeyboardAvoidingView 
                style={loginStyles.container} 
                /* behavior={Platform.OS === 'ios' ? 'padding' : 'height'} */>
                {/* Keyboard avoid view */}
                <Logo/>
                <Text style={ loginStyles.title }>Inicio de sesion</Text>

                <Text style={ loginStyles.label }>Email:</Text>
                <TextInput style={loginStyles.input} 
                    placeholder="Ingrese su email:" 
                    placeholderTextColor="white" 
                    keyboardType="email-address"
                    underlineColorAndroid="white"
                    onChangeText={(value) => onChange(value, 'email')}
                    value={email}
                    selectionColor="white"
                    autoCapitalize="none"
                    autoCorrect={false}
                    
                />
                <Text style={ loginStyles.label }>Contraseña:</Text>
                <TextInput 
                    style={loginStyles.input} 
                    placeholder="******" 
                    placeholderTextColor="white" 
                    underlineColorAndroid="white"
                    
                    secureTextEntry={true}
                    onChangeText={(value) => onChange(value, 'password')}
                    value={password}
                    selectionColor="white"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <View style={loginStyles.buttonContainer}>
                    <TouchableOpacity 
                        style={loginStyles.button} 
                        onPress={onLoginPress} 
                    >
                        <Text style={loginStyles.buttonText}>Iniciar Sesion</Text>
                    </TouchableOpacity>
                </View>
                {
                    (status !== 'semi-authenticated') 
                    ? (
                        <>
                        <View style={loginStyles.buttonContainer}>
                            <TouchableOpacity 
                                style={loginStyles.button} 
                                onPress={() => navigation.replace('RegisterScreen') }
                            >
                                <Text style={loginStyles.buttonText}>Nueva Cuenta</Text>
                            </TouchableOpacity>
                        </View>
                        </>
                    )
                    :(
                        <>
                        </>
                    )
                }
                
                
            </KeyboardAvoidingView>

        </>
    )
}
