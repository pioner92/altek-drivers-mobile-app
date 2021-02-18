import React from 'react';
import {View, StyleSheet, ViewStyle} from "react-native";
import {styleConfig} from "../../../StyleConfig";

type propsType = {
    style?:ViewStyle
}

export const WhiteCard: React.FC<propsType> = ({children,style}) => {
    return (
        <View style={[styles.container,styleConfig.shadowMenu,style]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        width:'100%',
        backgroundColor:'#ffffff',
        borderRadius:6,
        justifyContent:'center',
    },
})
