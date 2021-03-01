import {StyleSheet, View} from 'react-native'
import React from 'react'
import {StepCircle} from '../../atoms/step-circle'

export const StepCircles = () => {
    return (
        <View style={styles.container}>
            <StepCircle>1</StepCircle>
            <Line/>
            <StepCircle>2</StepCircle>
        </View>
    )
}

const Line = () => {
    return (
        <View style={styles.line}/>

    )
}
const styles = StyleSheet.create({
    container: {
        width: 22,
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 17,
        marginRight: 6,
    },
    line: {
        borderLeftWidth: 1,
        flex: 1,
        width: 1,
        borderColor: '#3284D2',
    },
})
