import React from 'react';
import {View, StyleSheet, Text} from "react-native";


type propsType = {
    bySelf:boolean
    from:string
    position:string
}

export const MessageHeader: React.FC<propsType> = ({bySelf,from,position}) => {
    return (
        <View style={[styles.container,
            {
                flexDirection: bySelf ? 'row' : 'row-reverse'
            }]}>
                <View style={[styles.positionWrapper,{backgroundColor:bySelf?'#E7F9FF':'#1672D4'}]}>
                    <Text style={[styles.position,{color:bySelf?'#3284D2':'#E7F9FF'}]}>{position}</Text>
                </View>
                <Text style={[styles.name, {color: bySelf ? '#fff' : '#1067C5'}]}>{from}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
    },
    positionWrapper: {
        backgroundColor: '#E7F9FF',
        borderRadius: 10,
        paddingHorizontal: 5,
        paddingVertical: 1,
    },
    name: {
        color: '#fff',
        fontSize: 10,
        fontFamily: 'IBMPlex-500',
        marginHorizontal:5
    },
    position: {
        color: '#1672D4',
        fontSize: 8,
        lineHeight:10,
        fontFamily: 'IBMPlex-500',
    },
})
