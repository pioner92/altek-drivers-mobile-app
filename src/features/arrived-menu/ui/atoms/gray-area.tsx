import React from 'react'
import {StyleSheet, View} from 'react-native'

export const GrayArea: React.FC = ({children}) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5F7FA',
        borderRadius: 6,
        padding: 14,
    },
})
