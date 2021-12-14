import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = "https://monitorest.herokuapp.com/api"; 


const loginApi = axios.create({baseURL});

loginApi.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
            config.headers['x-token'] = token;
        }   
        return config;
    },
);

export default loginApi;