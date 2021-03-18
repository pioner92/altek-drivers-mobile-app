import React, {useState} from 'react'
import {StyleSheet, Text, TouchableHighlight, ViewStyle} from 'react-native'

enum bgColor {
    blue = '#1672D4',
    blueActive = '#115FB6',
    blueDisabled = '#5E7C9C',
    white = '#fff',
    none = 'transparent'
}

enum borderColor {
    blue = '#3B8AE0',
    gray = '#C0C0C0',
    red = '#F95875',
    none = 'transparent'
}

enum labelColor {
    blue = '#1672D4',
    white = '#fff',
    red = '#FF4869',
    gray = '#798293'
}

export type buttonThemes = 'blue' | 'white' | 'red'

type themeType = {
    bg: string,
    bgActive: string,
    bgDisabled: string,
    borderColor: string,
    borderColorActive: string
    borderColorDisabled: string
    labelColor: string
    labelColorActive: string
    labelColorDisabled: string
}

class ThemeCreate {
    constructor({bg, bgActive, bgDisabled, borderColor, borderColorDisabled, borderColorActive, labelColor, labelColorActive, labelColorDisabled}: themeType) {
        return ({
            bg,
            bgActive,
            bgDisabled,
            borderColor,
            borderColorActive,
            borderColorDisabled,
            labelColor,
            labelColorActive,
            labelColorDisabled,
        })
    }
}


class Theme {
    create(theme: buttonThemes): ThemeCreate {
        switch (theme) {
            case 'blue':
                return new ThemeCreate({
                    bg: bgColor.blue,
                    bgDisabled: bgColor.blueDisabled,
                    bgActive: bgColor.blueActive,
                    borderColor: borderColor.none,
                    borderColorActive: borderColor.none,
                    borderColorDisabled: borderColor.none,
                    labelColor: labelColor.white,
                    labelColorActive: labelColor.white,
                    labelColorDisabled: labelColor.white,
                })
                break
            case 'white':
                return new ThemeCreate({
                    bg: bgColor.white,
                    bgDisabled: bgColor.none,
                    bgActive: bgColor.blueActive,
                    borderColor: bgColor.blue,
                    borderColorActive: borderColor.none,
                    borderColorDisabled: borderColor.gray,
                    labelColor: labelColor.blue,
                    labelColorActive: labelColor.white,
                    labelColorDisabled: labelColor.gray,
                })
                break
            case 'red':
                return new ThemeCreate({
                    bg: bgColor.none,
                    bgDisabled: bgColor.none,
                    bgActive: bgColor.none,
                    borderColor: borderColor.red,
                    borderColorActive: borderColor.gray,
                    borderColorDisabled: borderColor.gray,
                    labelColor: labelColor.red,
                    labelColorActive: labelColor.gray,
                    labelColorDisabled: labelColor.gray,
                })
                break
            default:
                return new ThemeCreate({} as themeType)
        }
    }
}


export type buttonPropsType = {
    onPress: () => void
    disabled?: boolean
    theme?: buttonThemes
    style?: ViewStyle
}

export const Button: React.FC<buttonPropsType> = ({onPress, children, disabled = false, theme = 'blue', style}) => {
    const colorTheme = new Theme().create(theme) as themeType

    const [labelColor, setLabelColor] = useState(colorTheme.labelColor)
    const [borderColor, setBorderColor] = useState(colorTheme.borderColor)

    const buttonStyle = {
        borderColor: disabled ? colorTheme.borderColorDisabled : borderColor,
        backgroundColor: disabled ? colorTheme.bgDisabled : colorTheme.bg,
    }

    const labelStyle = {
        color: disabled ? colorTheme.labelColorDisabled : labelColor,
    }

    const onClickHandler = (isPressed: boolean) => {
        setLabelColor(isPressed ? colorTheme.labelColorActive : colorTheme.labelColor)
        setBorderColor(isPressed ? colorTheme.borderColorActive : colorTheme.borderColor)
    }

    return (
        <TouchableHighlight
            disabled={disabled}
            underlayColor={colorTheme.bgActive}
            onShowUnderlay={onClickHandler.bind(null, true)}
            onHideUnderlay={onClickHandler.bind(null, false)}
            onPress={onPress}
            style={[styles.button, buttonStyle, style]}>
            <Text style={[styles.label, labelStyle]}>{children}</Text>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        borderRadius: 24,
        height: 54,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    },
    label: {
        fontFamily: 'IBMPlex-600',
        fontSize: 18,
        lineHeight: 23,
    },
})
