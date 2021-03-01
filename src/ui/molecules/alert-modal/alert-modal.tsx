import React from 'react'
import {Animated, StyleSheet} from 'react-native'
import {DarkBg} from '../../atoms/dark-bg'
import {AlertModalCard, confirmCardPropsType} from '../alert-modal-card/alert-modal-card'

type propsType = {
    animStyle: any
}

export type alertModalPropsType = confirmCardPropsType & propsType

export const AlertModal: React.FC<alertModalPropsType> = (
    {
        children,
        animStyle,
        ...props
    },
) => {
    return (
        <Animated.View style={[styles.container, animStyle]}>
            <DarkBg>
                <AlertModalCard {...props}>
                    {children}
                </AlertModalCard>
            </DarkBg>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        elevation: 200,
        zIndex: 200,
        height: '100%',
        width: '100%',
        position: 'absolute',
        alignSelf: 'center',
        justifyContent: 'center',
    },
})
