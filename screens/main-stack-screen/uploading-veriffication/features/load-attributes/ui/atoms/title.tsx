import React from 'react'
import {StyleSheet, Text} from 'react-native'

export const Title: React.FC = ({children}) => {
    return (
        <Text style={styles.text}>{children}</Text>
    )
}

const styles = StyleSheet.create({
    text: {
        color: '#1F2934',
        fontSize: 14,
        alignItems: 'center',
        fontFamily: 'IBMPlex-500',
        lineHeight: 18,
        flex: 1,
        textAlign: 'left',
    },
})
