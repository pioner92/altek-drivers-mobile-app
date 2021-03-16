import React from 'react'
import {StyleSheet, View, ViewStyle} from 'react-native'

type propsType = {
    style?: ViewStyle
}

export const BtnWrapper: React.FC<propsType> = ({children, style}) => {
    return (
        <View style={[styles.container, style]}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingBottom: 16,
        paddingHorizontal: 16,
    },
})
