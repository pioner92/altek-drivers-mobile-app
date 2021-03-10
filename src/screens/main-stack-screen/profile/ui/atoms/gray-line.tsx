import React from 'react'
import {StyleSheet, View, ViewStyle} from 'react-native'

type propsType = {
    style?: ViewStyle
}

export const GrayLine: React.FC<propsType> = ({style}) => {
    return (
        <View style={[styles.container, style]}/>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 1,
        backgroundColor: '#F4F4F4',
        width: '100%',
    },
})
