import React from 'react'
import {Animated, StyleSheet, TouchableOpacity} from 'react-native'
import {ButtonSetAvailable} from '../../ui/atoms/buttons'
import {TruckSVG} from '../../ui/atoms/icons'
import {IsAvailableCard} from '../../ui/atoms/card'
import {$setAvailableAnimValue, $shadowColor, $svgColor, $title} from './models'
import {useInterpolate} from '../../lib/animation-hooks/Hooks'
import {useStore} from 'effector-react'

type propsType = {
    callback: () => void
}


export const SetAvailable: React.FC<propsType> = ({callback}) => {
    const value = useStore($setAvailableAnimValue)
    const shadowColor = useStore($shadowColor)
    const svgColor = useStore($svgColor)
    const title = useStore($title)

    const opacityInterpolate = useInterpolate(value, [0, 0.7, 1], [1, 1, 0], 'clamp')
    const translateXInterpolate = useInterpolate(value, [0, 1], [-15, 100])

    const animStyle = {
        opacity: opacityInterpolate,
        transform: [
            {translateX: translateXInterpolate},
        ],
    }

    const onPress = () => {
        callback()
    }

    return (
        <Animated.View style={[animStyle, styles.button]}>
            <TouchableOpacity activeOpacity={0.5} onPress={onPress} style={styles.container}>
                <IsAvailableCard shadowColor={shadowColor}>{title}</IsAvailableCard>
                <ButtonSetAvailable style={{shadowColor: shadowColor}}>
                    <TruckSVG color={svgColor}/>
                </ButtonSetAvailable>
            </TouchableOpacity>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    button: {
        height: 46,
        position: 'absolute',
        bottom: 52,
        right: 0,
        zIndex: 2,
    },
})
