import React, { useContext } from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ContactStyles, SettingStyles, styles } from '../theme/appTheme';
import { ScrollView } from 'react-native-gesture-handler';
import { AuthContext } from '../context/AuthContext';

export const SettingsScreen = () => {

    const instets = useSafeAreaInsets();

    const {user, token, logOut} = useContext(AuthContext);

    return (
        <ScrollView style={SettingStyles.container}>
            <Text style={SettingStyles.title }>¿A quien llamar?</Text>
            <View style={SettingStyles.infoContainer }> 
                <Text style={SettingStyles.text}>Si quiere reportar algun problema o tiene alguna consulta sobre la aplicacion o sobre nosotros, no dude en consultar a :</Text>
            </View>
        </ScrollView>
        
    )
}
