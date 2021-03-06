import React from 'react'
import {StyleSheet, Text} from 'react-native'
import {WhiteCard} from '../../../../../../../ui/atoms/card/white-card'

export const CardRow: React.FC = () => {
    const circles = '••••'

    return (
        <WhiteCard style={styles.container}>
            <Text>{circles} 4331</Text>
        </WhiteCard>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
})
