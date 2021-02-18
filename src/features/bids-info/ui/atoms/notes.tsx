import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {styleConfig} from "../../../../StyleConfig";

type propsType = {
    notes:string
}

export const Notes:React.FC<propsType> = ({notes}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}><Text style={styles.title}>Notes: </Text>
                {notes}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingLeft: 13,
        paddingRight: 33,
        paddingTop:16
    },
    title: {
        color: styleConfig.textColor.dark,
        fontSize: 13,
        fontFamily: 'IBMPlex-600',
        lineHeight:17,
    },
    text: {
        fontSize:13,
        fontFamily:'IBMPlex-400',
        color:styleConfig.textColor.dark,
        lineHeight:17,
    }
})

