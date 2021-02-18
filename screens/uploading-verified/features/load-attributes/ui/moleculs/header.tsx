import React from 'react';
import {View, StyleSheet} from "react-native";
import {Title} from "../atoms";

export const Header: React.FC = () => {
    return (
        <View style={styles.container}>
            <View style={{flex:1.5}}></View>
            <Title>Scheduled</Title>
            <Title>Actual</Title>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        width:'100%',
    }
})
