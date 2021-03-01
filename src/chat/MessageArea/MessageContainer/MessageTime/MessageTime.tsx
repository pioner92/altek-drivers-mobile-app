import React from 'react'
import {StyleSheet, Text, View} from 'react-native'


type propsType = {
    time: string,
    bySelf: boolean
    isImage: boolean
}

export const MessageTime: React.FC<propsType> = ({time, bySelf, isImage}) => {
    const textColor = () => {
        if (isImage) {
            return '#fff'
        } else if (bySelf) {
            return '#BCD7FF'
        }
        return '#9C9C9C'
    }

    return (
        <View style={[styles.container, isImage && {paddingTop: 0}]}>
            <Text style={[styles.text, {color: textColor()}]}>{time}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingTop: 5,
    },
    text: {
        fontSize: 10,
        lineHeight: 13,
    },
})
