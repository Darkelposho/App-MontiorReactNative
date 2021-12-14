import React from 'react'
import { View, Text, Alert, Button } from 'react-native';
import { styles } from '../theme/appTheme';

export const alertScreen = () => {
    const showAlert = async () => {
        try {
            await Alert.alert(
                'Costa Peligrosa',
                'Dirigase a un lugar seguro',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
            );
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <View style={styles.globalMargin}>
            <Text style={styles.title}>Alert Screen</Text>
            <Button
                title="Show Alert" 
                onPress={showAlert} 
            />
        </View>
    )
}
