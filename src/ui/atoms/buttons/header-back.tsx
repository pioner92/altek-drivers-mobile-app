import React from 'react'
import {StyleSheet, View} from 'react-native'
import {LeftArrow} from '../icons/left-arrow'

export const HeaderBackButton = () => {
    return (
        <View style={styles.container}>
            <LeftArrow/>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        marginLeft: 20,
        padding: 5,
    },
})
