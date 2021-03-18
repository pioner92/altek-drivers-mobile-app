import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {styleConfig} from '../../../../../../../../../StyleConfig'


export type propsTotalRateCardBlockType = {
    title?: string
    value: string
}

export const TotalRateCardBlock: React.FC<propsTotalRateCardBlockType> = ({title = 'overall', value = 0}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.blockTitle}>{title}</Text>
            <Text style={styles.blockValue}>{value}$</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    blockTitle: {
        color: '#798293',
        fontFamily: 'IBMPlex-500',
        fontSize: 16,
        lineHeight: 21,
    },
    blockValue: {
        color: styleConfig.textColor.dark,
        fontFamily: 'IBMPlex-500',
        fontSize: 18,
        letterSpacing: -0.01,
        lineHeight: 23
    },
})
