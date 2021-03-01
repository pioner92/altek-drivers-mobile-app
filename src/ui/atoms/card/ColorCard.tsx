import React from 'react'
import {StyleSheet, View, ViewStyle} from 'react-native'

type propsType = {
    style?: ViewStyle | Array<ViewStyle>
}

export const ColorCard: React.FC<propsType> = ({children, style}) => {
    return (
        <View style={[styles.container, style]}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 70,
        backgroundColor: '#E3F1FF',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
