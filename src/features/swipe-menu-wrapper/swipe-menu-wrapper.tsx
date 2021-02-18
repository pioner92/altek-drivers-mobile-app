import React from 'react';
import {Animated, StyleSheet, View, ViewStyle} from "react-native";
import {SwipeLine} from "../../ui/atoms/swipe-line";
import {useInterpolate} from "../../../utils/animation-hooks/Hooks";
import {useStore} from "effector-react";
import {$animValueSwipeMenuWrapper, $newAnimValueSwipeMenuWrapper, $panResponder} from "./models/models";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type propsType = {
    value:any,
    zIndex?:number
    style?:ViewStyle
}

export const SwipeMenuWrapper: React.FC<propsType> = ({children,value,zIndex,style}) => {

    const insets = useSafeAreaInsets();

    const valueXY = useStore($newAnimValueSwipeMenuWrapper)
    const panResponder = useStore($panResponder)

    const interpolateY = useInterpolate(value,[0,1],[700,0])

    const animatedStyle = {
        transform: [
            {translateY: valueXY.y},
            {translateY: interpolateY}
        ]
    }


    return (
        <Animated.View
            style={[animatedStyle,styles.container,{zIndex:zIndex|| 100},style]}>
            <Animated.View {...panResponder.panHandlers} style={styles.sliderWrapper}>
                <SwipeLine/>
            </Animated.View>
            <View style={styles.buttonWrapper}>
                {children}
            </View>
            <View style={{backgroundColor:'#FEFEFE',height:0,width:'100%'}}/>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#FEFEFE',
        paddingTop:0,
        paddingBottom:12,
        position: "absolute",
        width: '100%',
        bottom: 0,
        zIndex:10,
        borderTopLeftRadius:12,
        borderTopRightRadius:12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 4,
    },
    buttonWrapper:{
        justifyContent:'space-between'
    },
    sliderWrapper: {
        height:30,
        justifyContent:"center",
        width: '100%',
        alignItems: 'center',
        // paddingBottom: 12,
    },
})
