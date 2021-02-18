import React from 'react';
import {LinearGradient} from "expo-linear-gradient";

export const Header = () => {
    return (
        <LinearGradient colors={['rgb(255,255,255)', 'rgba(255,255,255,0)']}
                        start={{x: 1, y: 0}}
                        end={{x: 1, y: 1}}
                        style={{height: 113,width:'100%',position:'absolute',top:0,zIndex:1}}>
        </LinearGradient>
    );
};
