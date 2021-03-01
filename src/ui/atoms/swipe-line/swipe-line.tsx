import React from 'react'
import {StyleSheet, View} from 'react-native'

export const SwipeLine: React.FC = () => {
    return (
        // <View style={styles.wrapper}>
        <View style={styles.container}/>
        // </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        backgroundColor: '#E4E2E3',
        width: 58,
        height: 4,
        borderRadius: 5,
        textAlign: 'center',
        alignSelf: 'center',
    },
})
