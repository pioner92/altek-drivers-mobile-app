import React from 'react';
import { StyleSheet, Text} from "react-native";



export const Title: React.FC = ({children}) => {
    return (
        <Text style={styles.text}>{children}</Text>
    );
};

const styles = StyleSheet.create({
    text:{
        color:'#1067C5',
        fontSize:18,
        fontFamily:'IBMPlex-600',
        lineHeight:23
    }
})
