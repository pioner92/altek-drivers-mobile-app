import React from 'react'
import {Animated} from 'react-native'
import {AlertModal, alertModalPropsType} from '../../../ui/molecules/alert-modal/alert-modal'
import {useInterpolate} from '../../../lib/animation-hooks/Hooks'

type propsType = {
    value: Animated.Value
}

type alertModalContainer = Omit<alertModalPropsType, 'animStyle'> & propsType

export const AlertModalContainer: React.FC<alertModalContainer> = (
    {
        children, value, ...props
    },
) => {
    const opacityInterpolate = useInterpolate(value, [0, 1], [0, 1])

    const opacity = {
        opacity: opacityInterpolate,
    }

    return (
        <AlertModal {...props} animStyle={opacity}>
            {children}
        </AlertModal>
    )
}

