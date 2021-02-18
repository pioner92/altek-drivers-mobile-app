import React from 'react';
import {View, StyleSheet, Text, ViewStyle, TextStyle} from "react-native";
import {useStore} from "effector-react";
import {$scrollSelectMenuSelectedValue} from "../../models/models";
import {styleConfig} from "../../../../StyleConfig";

type propsType ={
    style:any
    value:string
}

export const RenderItem: React.FC<propsType> = ({style,value}) => {

    const selectedValue = useStore($scrollSelectMenuSelectedValue)
    return (
        <View style={style}>
            <Text style={[styles.scrollValueTitle,style.fontSize,{fontFamily:selectedValue.value === value ?'IBMPlex-500':'IBMPlex-400' }]}>{value}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
    scrollValueTitle: {
        textAlign: "center",
        fontFamily:'IBMPlex-400',
        color:styleConfig.textColor.dark
    },
})
