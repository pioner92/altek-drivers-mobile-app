import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {styleConfig} from '../../../../StyleConfig'

type propsType = {
    title: string
    value: string
}

export const InfoRow: React.FC<propsType> = ({title, value}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingTop: 15,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    title: {
        flex: 1,
        color: '#7E7E7E',
        fontSize: 14,
        fontFamily: 'IBMPlex-400',
        lineHeight: 18,
    },
    value: {
        flex: 1,
        fontSize: 14,
        lineHeight: 18,
        fontFamily: 'IBMPlex-500',
        color: styleConfig.textColor.dark,
    },
})
