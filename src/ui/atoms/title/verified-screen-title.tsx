import React from 'react';
import {FlexStyle, StyleSheet, Text, TextStyle, ViewStyle} from "react-native";

type propsType = {
    color:string
    style?:Array<FlexStyle|TextStyle|undefined>
}

export const VerifiedScreenTitle: React.FC<propsType> = ({children,style,color}) => {
    return (
        <Text style={[styles.text,{color},style]}>{children}</Text>
    );
};

const styles = StyleSheet.create({
    text:{
        fontSize:14,
        lineHeight:18,
        fontFamily:'IBMPlex-500'
    }
})
