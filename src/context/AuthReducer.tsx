import { Usuario } from "../interfaces/UsuarioInterface";


export interface AuthState{
    status: 'cheking' | 'authenticated' | 'unauthenticated' | 'semi-authenticated';
    token: string|null;
    errorMessage: string;
    user: Usuario|null;
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

type AuthAction = 
    | { type: 'signUp', payload: {token: string, user: Usuario} }
    | { type: 'signIn', payload: {token: string, user: Usuario} }
    | { type: 'addError', payload: string }
    | { type: 'removeError' }
    | { type:'notAuthenticated'}
    | { type: 'logout'}


export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case "addError":
            return {
                ...state,
                user: null,
                status: 'unauthenticated',
                token: null,
                errorMessage: action.payload
            };
        case "removeError":
            return {
                ...state,
                errorMessage: ''
            };
        case "signUp":
            return {
                ...state,
                status: 'semi-authenticated',
                token: action.payload.token,
                user: action.payload.user
            };
        case "signIn":
            return {
                ...state,
                status: 'authenticated',
                token: action.payload.token,
                user: action.payload.user
            };
        case "logout":
        case "notAuthenticated":
            return {
                ...state,
                status: 'unauthenticated',
                token: null,
                user: userInitialState
            };
        default:
            return state;
        }
};