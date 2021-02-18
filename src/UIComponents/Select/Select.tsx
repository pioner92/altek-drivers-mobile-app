import React from 'react';
import {FlatList, StyleSheet, View} from "react-native";
import {SvgComponent} from "./SvgIcon";
import {Option} from "./Option";

export const Select = () => {
    return (
        <>
            <View style={styles.container}>
                <Option>150</Option>
                <SvgComponent/>
            </View>
            <FlatList
                style={styles.selectScrollView}
                data={valueGenerate()}
                keyExtractor={(item) => item.toString()}
                renderItem={({item}) => <Option>{item}</Option>}/>
        </>
    );
};


const valueGenerate = () => {
    const arr = []
    for (let i = 0; i < 301; i++) {
        arr.push(i)
    }
    return arr
}

const styles = StyleSheet.create({
    container: {
        width: 72,
        height: 30,
        borderWidth: 0.5,
        borderColor: '#BEC6D8',
        borderRadius: 2,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    value: {
        fontSize: 14,
        fontFamily: 'IBMPlex-500',
        color: '#102656',
        textAlign: 'center'
    },
    selectScrollView: {
        height: 200,
        width: 72,
        borderWidth: 0.5,
        borderColor: '#BEC6D8',

    }
})
