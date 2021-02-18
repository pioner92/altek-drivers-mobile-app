import React from 'react';
import {View, StyleSheet} from "react-native";


import Svg, { Circle } from "react-native-svg"

export const CheckBoxCheckedSVG = () => {
    return (
        <Svg width={18} height={18} viewBox="0 0 18 18" fill="none" >
            <Circle cx={9} cy={9} r={8.5} stroke="#1672D4" />
            <Circle cx={9} cy={9} r={6} fill="#1672D4" />
        </Svg>
    )
}


const styles = StyleSheet.create({
    container: {}
})
