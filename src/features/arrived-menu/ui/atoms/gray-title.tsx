import React from 'react';
import {View, StyleSheet, Text} from "react-native";

type propsType = {
    title:string
}

export const GrayTitle: React.FC<propsType> = ({title}) => {
    return (
        <Text style={styles.title}>{title}</Text>
    );
};

const styles = StyleSheet.create({
    title: {
        color:'#798293',
        fontSize:14,
        fontFamily:'IBMPlex-500',
        lineHeight:18
    }
})
