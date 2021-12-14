import React, { createContext, useEffect, useReducer } from "react";
import loginApi from "../api/loginApi";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Usuario, LoginResponse, LoginData, RegisterData, CoordinatesData } from '../interfaces/UsuarioInterface';
import { authReducer, AuthState } from "./AuthReducer";

type AutchContextProps = {
    errorMessage: string;
    token: string|null;
    user: Usuario|null;
    status: 'cheking' | 'authenticated' | 'unauthenticated' | 'semi-authenticated';
    signUp: ( registerData: RegisterData ) => void;
    signIn: ( loginData: LoginData ) => void;
    logOut: () => void;
    removeError: () => void;
    locate: (coordinatesData: CoordinatesData) => void;
}

const userInitialState: Usuario = {
    nombre: "",
    correo: "",
    rol:    "",
    estado: false,
    google: false,
    latitud: 0,
    longitud: 0,
    uid:    "",
}

const AuthInitialState: AuthState = {
    status: 'cheking',
    errorMessage: '',
    token: null,
    user: userInitialState
}

export const AuthContext = createContext({} as AutchContextProps);

export const AuthProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(authReducer, AuthInitialState)

    useEffect(() => {
        checkToken();
    }, [])

    const checkToken = async () => {
        try{
            const token = await AsyncStorage.getItem('token');
            if (!token) return dispatch({ type: 'notAuthenticated' });
            const resp = await loginApi.get('/auth');
            if (resp.status !== 200) {
                return dispatch({ type: 'notAuthenticated' });
            }
    
            await AsyncStorage.setItem('token', resp.data.token );
            dispatch({
                type: 'signIn',
                payload: {
                    token: resp.data.token,
                    user: resp.data.usuario
                }
            });
        }catch(error){
            if (error.status !== 200) {
                return dispatch({ type: 'notAuthenticated' });
            }
        }
        
    }

    const signIn = async({email, password}: LoginData) => {
        console.log(email, password);
        try {
            const { data } = await loginApi.post<LoginResponse>('/auth/login',{ correo: email, password: password });
            dispatch({
                type: 'signIn',
                payload: {
                    token: data.token,
                    user: data.usuario
                }
            });
            await AsyncStorage.setItem('token', data.token);
        } catch (error) {
            dispatch({
                type: 'addError',
                payload: error.response.data.msg || 'Información incorrecta'
            })
                    
        }
    };

    const signUp = async({ name, email, password }: RegisterData) => {
        try{
            const { data } = await loginApi.post<LoginResponse>('/usuarios', { correo: email, password: password, nombre: name, rol: 'USER' });
            dispatch({ 
                type: 'signUp',
                payload: {
                    token: data.token,
                    user: data.usuario
                }
            });
            await AsyncStorage.setItem('token', data.token );
        }catch(error){
            console.log(error.response.data);
            dispatch({ 
                type: 'addError', 
                payload: error.response.data.errors[0].msg || 'Revise la información'
            });
        }

    };
    
    const logOut = async() => {
        await AsyncStorage.removeItem('token');
        dispatch({ type: 'logout' });
    };

    const removeError = () => {
        dispatch({
            type: 'removeError'
        })
    };

    const locate = async({ uid, lat, lng }: CoordinatesData) => {
        try{
            const { data } = await loginApi.post<LoginResponse>('/usuarios/coordenadas', { id: uid, latitud: lat, longitud: lng });
            console.log(data);
        }catch(error){
            console.log(error.response.data.message);
        }
    }


    return(
        <AuthContext.Provider value = {{
            ...state,
            signUp,
            signIn,
            logOut,
            removeError,
            locate
        }}>
            {children}
        </AuthContext.Provider>
    )
}
