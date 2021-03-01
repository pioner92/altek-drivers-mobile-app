import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {styleConfig} from '../../../StyleConfig'

enum bgColor {
    blue = '#D3E5FC',
    green = '#D3FCDE'
}

enum titleColor {
    blue = '#1672D4',
    green = '#309716'
}

type colorKeys = keyof typeof bgColor
export type colors = typeof bgColor[colorKeys]

export type confirmCardPropsType = {
    title: string,
    theme?: colorKeys,
    enableLeftButton?: boolean
    enableRightButton?: boolean
    leftButtonLabel?: string
    rightButtonLabel: string
    onPressLeftButton?: () => void
    onPressRightButton: () => void
}


export const AlertModalCard: React.FC<confirmCardPropsType> = (
    {
        children,
        title,
        theme = 'blue',
        enableLeftButton = false,
        enableRightButton = true,
        leftButtonLabel,
        rightButtonLabel,
        onPressLeftButton,
        onPressRightButton,
    },
) => {
    const onPressLeft = () => {
        onPressLeftButton && onPressLeftButton()
    }

    const onPressRight = () => {
        onPressRightButton && onPressRightButton()
    }

    return (
        <View style={[styles.container, styleConfig.shadowModal]}>
            <View style={styles.modal}>
                <View style={[styles.labelWrapper, {backgroundColor: bgColor[theme]}]}>
                    <Text style={[styles.label, {color: titleColor[theme]}]}>{title}</Text>
                </View>
                <View style={styles.content}>
                    {children}
                </View>
                <View style={styles.buttonWrapper}>
                    {enableLeftButton ?
                        <TouchableOpacity onPress={onPressLeft} style={[styles.button, styles.leftButton]}>
                            <Text style={[styles.leftButtonLabel, styles.buttonLabel]}>{leftButtonLabel}</Text>
                        </TouchableOpacity> :
                        <View/>
                    }
                    {enableRightButton ?
                        <TouchableOpacity onPress={onPressRight}
                            style={[styles.button, {backgroundColor: bgColor[theme]}]}>
                            <Text
                                style={[styles.rightButtonLabel, styles.buttonLabel, {color: titleColor[theme]}]}>{rightButtonLabel}</Text>
                        </TouchableOpacity> :
                        <View/>
                    }
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: styleConfig.screenPadding,
    },
    modal: {
        backgroundColor: '#fff',
        width: '100%',
        height: 202,
        borderRadius: 8,
    },
    labelWrapper: {
        borderTopEndRadius: 8,
        borderTopStartRadius: 8,
        height: 43,
        paddingVertical: 10,
        paddingLeft: 16,
    },
    label: {
        fontSize: 18,
        fontFamily: 'IBMPlex-600',
        lineHeight: 23,
    },
    content: {
        height: 92,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    buttonWrapper: {
        borderTopColor: '#D3E5FB',
        borderTopWidth: 1,
        paddingHorizontal: 16,
        paddingTop: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        borderRadius: 8,
        height: 39,
        width: 57,
        alignItems: 'center',
        justifyContent: 'center',
    },
    leftButton: {
        backgroundColor: '#FFFFFF',
        borderColor: '#A1A7AF',
        borderWidth: 1,
    },
    buttonLabel: {
        fontSize: 18,
        fontFamily: 'IBMPlex-600',
        lineHeight: 23,
    },
    leftButtonLabel: {
        color: '#798293',
    },
    rightButtonLabel: {},
})
