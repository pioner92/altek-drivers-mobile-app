import React, {useEffect, useState} from 'react'
import {Animated, StyleSheet} from 'react-native'
import {useInterpolate} from '../../../../../utils/animation-hooks/Hooks'

type propsType = {
    onPress?: () => void
    animatedValue?: Animated.Value
}

export const DarkBgAnimated: React.FC<propsType> = ({onPress, animatedValue}) => {
    const [isMounted, setIsMounted] = useState(false)

    // let animValue = useStore($arrivedMenuAnimValue)
    let animValue: Animated.Value


    if (animatedValue !== undefined) {
        animValue = animatedValue
    } else {
        animValue = new Animated.Value(0)
    }

    const interpolateOpacity = useInterpolate(animValue, [0, 1, 2, 3], [0, 0.2, 0, 0.2])

    const opacityStyle = {
        opacity: interpolateOpacity,
    }

    const onPressHandler = () => {
        onPress && onPress()
    }

    useEffect(() => {
        animValue.addListener((state) => {
            if (state.value === 0 || state.value === 2) {
                setIsMounted(false)
            } else {
                setIsMounted(true)
            }
        })
        return () => animValue.removeAllListeners()
    }, [])

    if (!isMounted) {
        return null
    }
    return (
        <Animated.View onTouchStart={onPressHandler} style={[opacityStyle, styles.container]}/>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
    },
})
