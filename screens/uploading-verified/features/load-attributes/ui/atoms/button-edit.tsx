import React from 'react'
import {StyleSheet, Text, TouchableOpacity} from 'react-native'

type propsType = {
    callback: () => void
}

export const ButtonEdit: React.FC<propsType> = ({callback}) => {
    return (
        <TouchableOpacity onPress={callback} style={styles.container}>
            <Text style={styles.title}>Edit</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E3F1FF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        paddingHorizontal: 8,
    },
    title: {
        color: '#1A579A',
        fontSize: 14,
        fontFamily: 'IBMPlex-500',
        lineHeight: 18,
    },
})
