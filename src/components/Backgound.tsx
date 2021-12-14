import React from 'react'
import { View } from 'react-native';

export const Backgound = () => {
    return (
        <View style={{
            backgroundColor: '#6788a8',
            flex: 1,
            position: 'absolute',
            top: -250,
            width: 700,
            height: 1200,
            justifyContent: 'center',
            alignItems: 'center',
            transform: [{
                rotate: '-70deg'
            }]
        }}>
            
        </View>
    )
}
