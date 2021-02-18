import React from 'react';
import {StyleSheet, Text} from "react-native";

export const Option: React.FC = ({children}) => {
    return (
        <Text style={styles.value}>{children}</Text>
    )
}

const styles = StyleSheet.create({
    value: {
        fontSize: 14,
        fontFamily: 'IBMPlex-500',
        color: '#102656',
        textAlign: 'center'
    },
})
