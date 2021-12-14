import React from 'react'
import { ActivityIndicator, Text, View, ScrollView } from 'react-native';

import { styles } from '../theme/appTheme';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ClimateData } from '../components/ClimateData';

import { useClimate } from '../hooks/useClimate';
import { useLocation } from '../hooks/useLocation';







export const DataScreen = () => {

    const { feed, channel, isLoading } = useClimate();
    
    const { top }= useSafeAreaInsets();

    

    if(isLoading) {
        return (
            <View style={styles.menuContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }   

    return (
        <ScrollView>
            <View style = {{margin: top + 20}}>
                <ClimateData
                    channel = {channel}
                    feeds={feed[0]}
                />
            </View>
        </ScrollView>
        
    )
}
