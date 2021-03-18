import {WhiteCard} from '../../../../../../ui/atoms/card/white-card'
import {StyleSheet, Text} from 'react-native'
import React from 'react'

type propsType = {
    number: string
}

export const CompanyNumberCard: React.FC<propsType> = ({number}) => {
    return (
        <WhiteCard style={styles.card}>
            <Text style={styles.title}>The company’s number is</Text>
            <Text style={styles.number}>{number}</Text>
        </WhiteCard>
    )
}

const styles = StyleSheet.create({
    card: {
        paddingHorizontal: 12,
        marginTop: 20,
        paddingVertical: 10,
        alignItems: 'center'
    },
    title: {
        color: '#000',
        fontFamily: 'IBMPlex-500',
        lineHeight: 18,
    },
    number: {
        color: '#3385FF',
        fontSize: 14,
        fontFamily: 'IBMPlex-600',
        lineHeight: 18,
    },
})
