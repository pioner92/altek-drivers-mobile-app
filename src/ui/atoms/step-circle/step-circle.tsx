import {StyleSheet, Text, View} from 'react-native'
import React from 'react'

export const StepCircle: React.FC = ({children}) => {
    return (
        <View style={styles.circle}>
            <Text style={styles.circleTitle}>{children}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    circle: {
        width: 20,
        height: 20,
        borderRadius: 50,
        backgroundColor: '#3284D2',
        borderWidth: 2,
        borderColor: '#DDEEFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    circleTitle: {
        fontSize: 10,
        fontFamily: 'IBMPlex-500',
        color: '#fff',
        textAlign: 'center',
    },
})
