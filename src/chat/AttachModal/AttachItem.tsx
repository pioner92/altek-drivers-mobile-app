import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {styleConfig} from "../../StyleConfig";


type propsType = {
    children: React.ReactChild
    callback?: () => void
}

export const AttachItem: React.FC<propsType> = ({children, callback}) => {
    return (
        <TouchableOpacity onPress={callback} style={styles.container}>
            <Text style={styles.attachItemTitle}>{children}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 50,
        borderTopWidth: 1,
        borderColor: '#f4f4f4'
    },
    attachItemTitle: {
        fontSize: 14,
        fontFamily: 'IBMPlex-400',
        color: styleConfig.textColor.dark
    }
})
