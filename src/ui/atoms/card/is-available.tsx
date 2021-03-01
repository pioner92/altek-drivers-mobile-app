import React from 'react'
import {StyleSheet, Text, View} from 'react-native'


type propsType = {
    shadowColor: string
}

export const IsAvailableCard: React.FC<propsType> = ({children, shadowColor}) => {
    return (
        <View
            style={[styles.container, {shadowColor: shadowColor}]}>
            <Text style={styles.statusTitle}>{children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 23,
        backgroundColor: '#fff',
        borderRadius: 7,
        paddingRight: 24,
        paddingLeft: 6,
        zIndex: 1,
        justifyContent: 'center',
        shadowColor: '#FFC5C5',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 5,
    },
    statusTitle: {
        fontSize: 11,
        fontFamily: 'IBMPlex-500',
        lineHeight: 14,
        color: '#1F2934',
    },
})
