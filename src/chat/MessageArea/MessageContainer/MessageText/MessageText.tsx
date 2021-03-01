import React from 'react'
import {StyleSheet, Text, View} from 'react-native'


type propsType = {
    children: React.ReactChild
    style: any
    bySelf: boolean
}

export const MessageText: React.FC<propsType> = ({children, style, bySelf}) => {
    return (
        <View style={[styles.container, {alignItems: 'flex-start'}]}>
            <Text style={[styles.text, {color: bySelf ? '#fff' : '#091735'}]}>{children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 4,
        maxWidth: 250,
        alignItems: 'flex-end',
    },
    text: {
        color: '#fff',
        fontSize: 14,
        fontFamily: 'IBMPlex-400',
        lineHeight: 18,
        marginTop: 4,
        maxWidth: 250,
    },
})
