import React from 'react';
import {GestureResponderEvent, StyleSheet, TouchableOpacity, ViewStyle} from "react-native";

type buttonSetAvailableType = {
    children: React.ReactChild
    callback: (e: GestureResponderEvent) => void
    style?:ViewStyle
}



export const ButtonSetAvailable: React.FC<buttonSetAvailableType> = ({children,style, callback}) => {
    return (
        <TouchableOpacity
            style={[styles.button,style]}
            onPress={callback}>
            {children}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 42,
        width: 104,
        alignItems: 'flex-end'
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
            {translateX: -20}
        ],
        shadowColor:'red',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 5,
    }
})


