import {View,StyleSheet} from "react-native";
import React from "react";

export const SliderMarker = (e:any) => {
    return (
        <View
            style={styles.container}/>
    )
}

const styles = StyleSheet.create({
    container:{
        width:20,
        height:20,
        borderRadius:50,
        backgroundColor:'#1672D4',
        borderColor:'#BBD6FF',
        borderWidth:2
    }
})
