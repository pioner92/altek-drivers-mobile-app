import React from 'react'
import {StyleSheet, View, ViewStyle} from 'react-native'

type propsType = {
    style?: ViewStyle
}

export const WrapperPaddingBottom: React.FC<propsType> = ({children, style}) => {
    return (
        <View style={[styles.container, style]}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 16,
    },
})
