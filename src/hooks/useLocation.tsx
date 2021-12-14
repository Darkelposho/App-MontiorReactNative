import { useContext, useEffect, useState } from 'react'
import * as Location from 'expo-location';
import { Coords } from '../interfaces/LocationInterface';
import { AuthContext } from '../context/AuthContext';

const Locationprops: Coords = {
    latitude:         0,
    longitude:        0,
    altitude:         0,
    accuracy:         0,
    altitudeAccuracy: 0,
    heading:          0,
    speed:            0,
}

export const useLocation = () => {
    const [location, setLocation] = useState<Coords>(Locationprops);
    const [mapRegion, setregion] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const {user, locate} = useContext(AuthContext);


    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Se denegó el permiso para acceder a la ubicación');
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location.coords);
        setregion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        });
        locate({uid: user.uid, lat: location.coords.latitude, lng: location.coords.longitude});
    }

    const changeRegion = (Region: any) => {
        setregion(Region);
    }

    useEffect(() => {
        getLocation();
        setInterval(getLocation, 60000);
    }, []);

    return {
        location,
        errorMsg,
        mapRegion,
        changeRegion,
    }   
}
