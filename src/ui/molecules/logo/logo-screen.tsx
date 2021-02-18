import React from 'react';
import {View, StyleSheet,Image} from "react-native";
const logo = require("../../../../assets/images/splash.png")

export const LogoScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <Image width={200} height={100}  resizeMode={"contain"} style={{width:"30%"}} source={logo}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width:'100%',
        height:'100%',
        backgroundColor:'#fff',
        position:"absolute",
        alignItems:'center',
        justifyContent:'center',
        // opacity:0.1,
        zIndex:1
    }
})
