import React from 'react'
import {StyleSheet, Text, TouchableOpacity} from 'react-native'
import {styleConfig} from '../../../../StyleConfig'

type propsType = {
    onPress: () => void
    label: string,
    color?: string
}

export const Button: React.FC<propsType> = ({onPress, label, color = styleConfig.textColor.dark}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text style={[styles.buttonLabel, {color}]}>{label}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonLabel: {
        fontFamily: 'IBMPlex-600',
        fontSize: 14,
        lineHeight: 18,
    },
})
