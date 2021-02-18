import React from 'react';
import {StyleSheet, Text} from "react-native";
import {ColorCard} from "../../../../ui/atoms/card/ColorCard";

type propsType = {
    value:string
    description:string
}

export const PriceAreaComponent: React.FC<propsType> = ({value,description}) => {
    return (
        <ColorCard>
            <Text style={styles.value}>${value}</Text>
            <Text style={styles.description}>{description}</Text>
        </ColorCard>
    );
};

const styles = StyleSheet.create({
    container: {},
    value:{
        color:'#3284D2',
        fontSize:18,
        fontFamily:'IBMPlex-600',
        lineHeight:23
    },
    description:{
        color:'#3284D2',
        fontSize:12,
        fontFamily:'IBMPlex-500',
        lineHeight:16
    }
})
