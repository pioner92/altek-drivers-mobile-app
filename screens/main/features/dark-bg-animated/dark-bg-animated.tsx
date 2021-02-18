import React, {useEffect, useState} from "react";
import {View, StyleSheet, Animated} from "react-native";
import {useStore} from "effector-react";
import {$animValueDarkBGAnimated, $isMountedDarkBGAnimated} from "./models/models";
import {useInterpolate} from "../../../../utils/animation-hooks/Hooks";
import {$arrivedMenuAnimValue} from "../../../../src/features/arrived-menu/models";

type propsType = {
    onPress: () => void
}

export const DarkBgAnimated: React.FC<propsType> = ({onPress}) => {

    const [isMounted, setIsMounted] = useState(false)

    const animValue = useStore($arrivedMenuAnimValue)
    const interpolateOpacity = useInterpolate(animValue, [0, 1, 2, 3], [0, 0.2, 0, 0.2])

    const opacityStyle = {
        opacity: interpolateOpacity
    }

    useEffect(() => {
        animValue.addListener(state => {
            if (state.value === 0 || state.value === 2) {
                setIsMounted(false)
            } else {
                setIsMounted(true)
            }
        })
        return ()=> animValue.removeAllListeners()
    },[])

    if (!isMounted) {
        return null
    }
    return (
        <Animated.View onTouchStart={onPress} style={[opacityStyle, styles.container]}/>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'black'
    }
})