import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {CameraSVG} from "../../atoms/icons";
import {styleConfig} from "../../../StyleConfig";

type propsType = {
    callback: () => void
}

export const TakenPicture: React.FC<propsType> = ({children, callback}) => {
    return (
        <TouchableOpacity style={[styles.container,styleConfig.shadowMenu]} onPress={callback}>
            <CameraSVG/>
            <Text style={styles.label}>{children}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#fff',
        height: 94,
        flex: 1,
        maxHeight:94,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
    },
    label: {
        color: '#1672D4',
        fontSize: 12,
        fontFamily: 'IBMPlex-500',
        lineHeight: 16,
        marginTop: 8
    }
})
