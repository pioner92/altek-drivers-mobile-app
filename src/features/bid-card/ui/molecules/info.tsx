import React from "react";
import {StyleSheet, Text, View} from "react-native";

type InfoType = {
    title1:string
    title2:string
    title3:string
}

export const Info:React.FC<InfoType> = ({title1,title2,title3}) => {
    return (
        <View style={styles.info}>
            <View style={{alignItems:'flex-end',height:26}}>
                <Text style={styles.infoTitle}>{title1}</Text>
                <Text style={styles.infoTitle}> {title2}</Text>
            </View>
            <View style={{height:13,alignItems:'flex-end'}}>
                <Text style={styles.infoTitle}>{title3}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    info: {
        alignItems: 'flex-end',
        marginRight: 14,
        height:82,
        justifyContent:'space-between',
        paddingTop:13,
        paddingBottom:11
    },
    infoTitle: {
        color: '#133271',
        fontSize: 10,
        fontFamily: 'IBMPlex-400',
        fontWeight: 'normal',
        lineHeight: 13
    }
})
