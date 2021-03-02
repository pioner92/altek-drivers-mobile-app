import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {styleConfig} from '../../../../../src/StyleConfig'

export const ProfileTitle: React.FC = ({children}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingBottom: 10,
    },
    title: {
        fontSize: 18,
        lineHeight: 23,
        color: styleConfig.textColor.dark,
        fontFamily: 'IBMPlex-500',
    },
})
