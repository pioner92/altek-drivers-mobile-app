import React from 'react';
import {View,Text,StyleSheet} from "react-native";


export const AuthTitle:React.FC = ({children}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{children}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        height:184,
        alignItems:'center',
        paddingTop:90,
    },
    title:{
        fontSize:22,
        // fontFamily:'IBMPlex-600',
        fontFamily:'IBMPlex-600',
        // color:styleConfig.textColor.dark
        color:"#000"
    }
})
