import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {styleConfig} from "../../StyleConfig";

export const SelectTitle:React.FC = ({children}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.menuSubTitle}>{children}</Text>
        </View>

    );
};

const styles = StyleSheet.create({
    container:{
      paddingVertical:8
    },
    menuSubTitle: {
        fontFamily: 'IBMPlex-500',
        fontWeight: '500',
        fontSize: 16,
        lineHeight:21,
        color: styleConfig.textColor.dark,
    }
})
