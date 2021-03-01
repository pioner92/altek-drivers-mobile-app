import React from 'react'
import {StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle} from 'react-native'
import {ColorCard} from '../../atoms/card/ColorCard'

type theme = 'blue' | 'gray'

enum bg {
    blue = '#E3F1FF',
    gray = '#EDEDED'
}

enum labelColor {
    blue = '#1A579A',
    gray = '#798293'
}

type propsType = {
    Icon: React.FC
    onPress: () => void
    label: string
    labelStyle?: TextStyle
    theme?: theme
    style?: ViewStyle
}

export const ButtonColorCardWithIcon: React.FC<propsType> = ({onPress, Icon, label, theme = 'blue', labelStyle, style}) => {
    return (
        <ColorCard style={[{...style}, {borderRadius: 10, backgroundColor: bg[theme]}]}>
            <TouchableOpacity onPress={onPress} style={styles.container}>
                <Text style={[styles.text, {color: labelColor[theme]}, labelStyle]}>{label}</Text>
                <View style={{}}>
                    <Icon/>
                </View>
            </TouchableOpacity>
        </ColorCard>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center',
    },
    text: {
        flex: 1,
        color: '#1A579A',
        fontSize: 14,
        fontFamily: 'IBMPlex-500',
        lineHeight: 18,
    },
})
