import {useRef} from "react";
import {Animated} from "react-native";



export const useValue = (value: number) => {
    return useRef(new Animated.Value(value)).current
}

export const useValueXY = (x:number,y:number) => {
    return useRef(new Animated.ValueXY({x,y})).current
}


export const useTiming = (value: ReturnType<typeof useValue> | ReturnType<typeof useValueXY> , toValue: number, duration: number, useNativeDriver: boolean = true) => {
    return Animated.timing(value, {
        toValue,
        duration,
        useNativeDriver
    })
}

export const useSpring = (value: ReturnType<typeof useValue> | ReturnType<typeof useValueXY>, toValue: number|{x:number,y:number}, tension: number, friction: number, useNativeDriver: boolean = true) => {
    return Animated.spring(value, {
        toValue,
        tension,
        friction,
        useNativeDriver
    })
}

type extrapolateType = 'clamp'

export const useInterpolate = (value:ReturnType<typeof useValue>,inputRange:number[],outputRange:number[]|string[],extrapolate?:extrapolateType) => {
    return value.interpolate({
        inputRange,
        outputRange,
        extrapolate
    })
}

export const useTimingAsync = (value: ReturnType<typeof useValue> | ReturnType<typeof useValueXY> , toValue: number, duration: number, useNativeDriver: boolean = true) => {
    return new Promise(resolve =>  Animated.timing(value, {
        toValue,
        duration,
        useNativeDriver
    }).start(resolve))
}

export const useSpringAsync = (value: ReturnType<typeof useValue> | ReturnType<typeof useValueXY>, toValue: number|{x:number,y:number}, tension: number, friction: number, useNativeDriver: boolean = true) => {
    return new Promise(resolve =>  Animated.spring(value, {
        toValue,
        tension,
        friction,
        useNativeDriver
    }).start(resolve))
}
