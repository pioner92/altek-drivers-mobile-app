import React from 'react';
import {View, StyleSheet} from "react-native";

export const Line1px: React.FC = () => {
    return (
        <View style={styles.container}/>
    );
};

const styles = StyleSheet.create({
    container: {
        width:'100%',
        height:1,
        backgroundColor:'#E2E2E2'
    }
})
