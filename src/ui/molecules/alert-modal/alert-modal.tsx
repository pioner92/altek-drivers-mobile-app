import React from 'react'
import {Animated, Dimensions, StyleSheet} from 'react-native'
import {DarkBg} from '../../atoms/dark-bg'
import {AlertModalCard, confirmCardPropsType} from '../alert-modal-card/alert-modal-card'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

type propsType = {
    animStyle: any
}

const height = Dimensions.get('window').height

export type alertModalPropsType = confirmCardPropsType & propsType

export const AlertModal: React.FC<alertModalPropsType> = (
    {
        children,
        animStyle,
        ...props
    },
) => {
    const inset = useSafeAreaInsets()

    return (
        <Animated.View style={[styles.container, animStyle, {height: height + inset.top, top: -inset.top}]}>
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
