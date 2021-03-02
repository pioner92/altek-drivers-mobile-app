import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {styleConfig} from '../../../../../src/StyleConfig'

export const FilterTitle: React.FC = ({children}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {},
    title: {
        fontSize: 16,
        fontFamily: 'IBMPlex-600',
        lineHeight: 21,
        color: styleConfig.textColor.dark,
    },
})
