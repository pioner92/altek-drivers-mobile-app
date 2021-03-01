import React from 'react'
import {StyleSheet, View} from 'react-native'

export const Line: React.FC = () => {
    return (
        <View style={styles.container}>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 0.5,
        width: '100%',
        borderColor: '#DDDEE1',
    },
})
