import React from 'react'
import { Text, View, Image } from 'react-native';
import { loginStyles } from '../theme/appTheme';

export const Logo = () => {
    return (
        <View style={{
            alignItems : 'center',
            justifyContent: 'center',
        }}>
            <Image
                source={require('../assets/images/logo.jpeg')}
                style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    marginBottom: 10,
                }}
            />
            
        </View>
    )
}
