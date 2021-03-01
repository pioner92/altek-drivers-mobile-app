import React from 'react'
import {StyleSheet, View, ViewStyle} from 'react-native'

type buttonSetAvailableType = {
    children: React.ReactChild
    style?: ViewStyle
}


export const ButtonSetAvailable: React.FC<buttonSetAvailableType> = ({children, style}) => {
    return (
        <View
            style={[styles.button, style]}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 42,
        width: 104,
        alignItems: 'flex-end',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        height: 48,
        width: 48,
        zIndex: 10,
        transform: [
            {translateX: -20},
        ],
        shadowColor: 'red',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 5,
    },
})


