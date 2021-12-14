import React, { Component, useEffect, useState } from 'react'
import { Channel, Feed } from '../interfaces/ClimateInterface';
import { Alert, Text, View, Image } from 'react-native';
import { DataStyles} from '../theme/appTheme';
import { getDistance } from 'geolib';
import { useLocation } from '../hooks/useLocation';
import { Ionicons, FontAwesome5, Feather } from '@expo/vector-icons'; 
import MapView, { Marker }  from 'react-native-maps';

interface ClimateDataProps { 
    channel: Channel;
    feeds: Feed;
}

export const ClimateData = ({channel, feeds}: ClimateDataProps) => {

    const {location, errorMsg, mapRegion, changeRegion} = useLocation();

    const [count, setCount] = useState(true);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }
    const showAlert = async () => {
        try{
            await Alert.alert(
                'Costa Peligrosa',
                'Dirigase a un lugar seguro',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
            );
        }catch(error){
            console.log(error);
        }
    }



    useEffect(() => {
 
        // Set the count variable value to Zero.
        setCount(false);
     
        if (parseFloat(feeds.field3)>=15 || parseFloat(feeds.field3)<=9){
            showAlert();
        }
     
      }, [] );
    
    
    const calculateDistance = () => {
        var dis = getDistance(
            { latitude: channel.latitude, longitude: channel.longitude },
            { latitude: location.latitude , longitude: location.longitude }   
          );
        return dis/1000;
    }

    const transform = (dateStr: string) => {
        const date = new Date(dateStr);
        let year = date.getFullYear();
        date.setMonth(date.getMonth() + 1);
        let month = date.getMonth();
        let dt = date.getDate();
        date.setHours(date.getHours()-3);
        let hour = date.getHours();
        let min = date.getMinutes();
        let sec = date.getSeconds();
        return (dt < 10 ? '0' : '') + dt + '/' + 
            (month < 10 ? '0' : '') + month + '/' + year + ' ' +  
            (hour < 10 ? '0' : '') + hour + ':' + 
            (min < 10 ? '0' : '') + min + ':' + sec;
    }



    return (
        <View style = {DataStyles.globalMargin}> 
        <Text style = {DataStyles.title_map}>Datos:</Text>
            <View style = {DataStyles.channelData}>
                <View style={DataStyles.containerDistance}>  
                    <Text style={DataStyles.title}>Fecha de actualización: {transform(feeds.created_at)}</Text>
                </View>
                
                <View style={DataStyles.containerDistance}>
                    <Text style={DataStyles.title}>Distancia del equipo: {calculateDistance()} Km</Text>
                </View>
      
            </View>
            <View style = {DataStyles.container}>
                <View style = {DataStyles.feedData1}>
                    <View style={DataStyles.tempContainer}>
                        <FontAwesome5 name="temperature-low" size={24}  color="white" />
                        <Text style={DataStyles.feedDataText}>Temperatura: {feeds.field5}°C</Text> 
                    </View>
                    <View style={DataStyles.humContainer}> 
                        <Ionicons name="water-outline" size={24} color="white" />
                        <Text style={DataStyles.feedDataText}>Humedad: {feeds.field6}%</Text> 
                    </View>
                </View>
                <View style = {DataStyles.feedData2}>
                    <View style={DataStyles.aguContainer}>
                        <FontAwesome5 name="water" size={24} color="white" />
                        <Text style={DataStyles.feedDataText}>Nivel de Agua Promedio: {feeds.field3} Cm</Text>
                    </View>
                    <View style={DataStyles.vieContainer}>
                        <Feather name="wind" size={24} color="white" />
                        <Text style={DataStyles.feedDataText}>Vientos: {feeds.field4} Km/h</Text>
                    </View>
                </View>
            </View>
            <Text style = {DataStyles.title_map}>Posicion Actual:</Text>
            <View style = {DataStyles.container_map}>
                <MapView 
                    style = {DataStyles.map}
                    region = {mapRegion}
                    initialRegion={{
                        "latitude": location.latitude,
                        "latitudeDelta": 0.0922,
                        "longitude": location.longitude,
                        "longitudeDelta": 0.0421,
                    }}
                    onRegionChangeComplete = {region => changeRegion(region)}
                >
                    <Marker
                        coordinate={{"latitude":location.latitude,"longitude":location.longitude}}
                        title='Mi ubicación'
                    />
                    <Marker
                        coordinate={{"latitude":parseFloat(channel.latitude),"longitude":parseFloat(channel.longitude)}}
                        title='Dispositivo'
                    >
                        <Image source={require('../assets/images/Sensor.png')} style={DataStyles.marker}/>
                    </Marker>
                </MapView>
            </View>
           
        </View>
    )
}
