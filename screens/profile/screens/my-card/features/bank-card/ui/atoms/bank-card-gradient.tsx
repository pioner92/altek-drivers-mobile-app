import React from 'react'
import {StyleSheet} from 'react-native'
import {LinearGradient} from 'expo-linear-gradient'

export const BankCardGradient: React.FC = ({children}) => {
    return (
        <LinearGradient
            start={{x: 1, y: 0}}
            end={{x: 1, y: 1}}
            colors={['#1067C5', '#617AFF']}
            style={styles.container}
        >
            {children}
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 180,
        width: '100%',
        borderRadius: 13,
        paddingHorizontal: 28,
        paddingBottom: 29,
        paddingTop: 63,
        justifyContent: 'space-between',
    },
})
