import React from 'react'
import {StyleSheet, Text, TouchableOpacity} from 'react-native'

type propsType = {
    callback: () => void
    color: string
}

export const ButtonText: React.FC<propsType> = ({children, callback, color}) => {
    return (
        <TouchableOpacity onPress={callback} style={styles.container}>
            <Text style={[{color}, styles.title]}>{children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {},
    title: {
        fontSize: 18,
        fontFamily: 'IBMPlex-600',
        lineHeight: 23,
    },
})
