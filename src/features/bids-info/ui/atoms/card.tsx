import React from 'react'
import {StyleSheet, View} from 'react-native'
import {styleConfig} from '../../../../StyleConfig'

type propsType = {
    style?: any
}

export const Card: React.FC<propsType> = ({children, style}) => {
    return (
        <View style={[styles.container, styleConfig.shadowMenu, style]}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        width: '100%',
        borderRadius: 15,
        paddingTop: 16,
        paddingBottom: 20,
    },
})
