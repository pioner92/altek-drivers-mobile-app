import React from 'react'
import {StyleSheet, Text, TextStyle, TouchableOpacity, View} from 'react-native'

type navButtonType = {
    disabled?: boolean
    children: React.ReactChild
    callback: () => void
    Icon: React.FC,
    isBadge?: boolean
    style?: TextStyle
}

export const NavButton: React.FC<navButtonType> = ({
    disabled = false,
    children,
    Icon,
    callback,
    isBadge = false,
    style,
}) => {
    return (
        <TouchableOpacity disabled={disabled} style={styles.container} onPress={callback}>
            {isBadge &&
            <View style={styles.badge}/>
            }
            <Icon/>
            <Text style={[styles.label, style]}>{children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 33,
    },
    label: {
        fontFamily: 'IBMPlex-500',
        fontSize: 9,
        lineHeight: 12,
        letterSpacing: -0.01,
    },
    badge: {
        backgroundColor: '#1672D4',
        width: 8,
        height: 8,
        borderRadius: 4,
        position: 'absolute',
        transform: [
            {translateY: -1},
            {translateX: 8},
        ],
    },
})
