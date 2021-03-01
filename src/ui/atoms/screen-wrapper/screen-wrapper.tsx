import React from 'react'
import {Dimensions, Keyboard, Platform, StyleSheet, View, ViewStyle} from 'react-native'
import {SafeAreaComponent} from '../safe-area'
import {styleConfig} from '../../../StyleConfig'
import {useHeaderHeight} from '@react-navigation/stack'

const height = Dimensions.get('window').height

type propsType = {
    safeAreaStyle?: ViewStyle
    style?: ViewStyle
    isEnabledHeightController?: boolean
    enableNavigateButtons?: boolean
}

export const ScreenWrapper: React.FC<propsType> = ({children, isEnabledHeightController = false, safeAreaStyle, style}) => {
    const headerHeight = useHeaderHeight()

    const closeKeyboard = () => {
        Keyboard.dismiss()
    }

    const heightStyle = {
        height: height - headerHeight,
    }

    return (
        <SafeAreaComponent style={safeAreaStyle}>
            <View onTouchMove={closeKeyboard}
                style={[styles.container, style, isEnabledHeightController && Platform.OS === 'ios' && heightStyle]}>
                {children}
            </View>
        </SafeAreaComponent>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: styleConfig.screenBackground,
        height: '100%',
    },
})
