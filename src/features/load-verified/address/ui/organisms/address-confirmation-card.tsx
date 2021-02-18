import React, {useState} from 'react';
import {View, StyleSheet, Text} from "react-native";
import {CheckBoxComponent} from "../../../../../ui/atoms/check-box/check-box";
import {styleConfig} from "../../../../../StyleConfig";
import {CheckBox} from "../../feature/check-box/check-box";


type propsType = {
    text:string
    callback?:(index:number)=>void
}

export const AddressConfirmationCard: React.FC<propsType> = ({text,callback}) => {
    return (
        <View style={[styles.container,styleConfig.shadowMenu]}>
            <Text style={styles.text}>{text}</Text>
                <CheckBox callback={callback}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#fff',
        height:98,
        width:'100%',
        paddingHorizontal:22,
        paddingVertical:16,
        borderRadius:5,
    },
    text:{
        color:styleConfig.textColor.dark,
        fontFamily:'IBMPlex-500',
        fontSize:14
    }
})
