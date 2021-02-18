import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from "react-native";
import {CheckBoxComponent} from "../../atoms/check-box/check-box";
import {styleConfig} from "../../../StyleConfig";


type propsType = {
    isChecked:boolean
    callback:(index:number)=>void
    index:number
}

export const CheckBoxItem: React.FC<propsType>= ({children,index,isChecked,callback}) => {

    const onToggle = () => {
        callback(index)
    }

    return (
        <TouchableOpacity onPress={onToggle} style={styles.container}>
            <CheckBoxComponent toggleCheckBox={isChecked} setToggleCheckBox={onToggle}/>
            <Text style={styles.label}>{children}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        alignItems:'center',
        width:50,
        justifyContent:"space-between"
    },
    label:{
        color:styleConfig.textColor.dark,
        fontSize:16,
        lineHeight:21,
        fontFamily:'IBMPlex-500'
    }
})
