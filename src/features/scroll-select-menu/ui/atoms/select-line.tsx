import React from 'react';
import {View, StyleSheet, Text} from "react-native";
import {styleConfig} from "../../../../StyleConfig";

type propsType = {
    listHeight:number
    itemHeight:number
}

export const SelectLine: React.FC<propsType> = ({listHeight,itemHeight}) => {
    const styles = StyleSheet.create({
        container: {
            position:"absolute",
            top:listHeight/2-(itemHeight/2),
            width:'100%',
            height:itemHeight,
            borderTopWidth:0.5,
            borderBottomWidth:0.5,
            borderColor:'#ECEFFF',
            zIndex:2,
            alignItems:"center",
            justifyContent:"center"
        },
        label:{
            textAlign:"center",
            marginLeft:100,
            color:styleConfig.textColor.dark,
            fontSize:10,
            fontFamily:'IBMPlex-400',
            lineHeight:13,
        }
    })

    return (
        <View pointerEvents='none' style={styles.container}>
            <Text style={styles.label}>per mile</Text>
        </View>
    );
};

