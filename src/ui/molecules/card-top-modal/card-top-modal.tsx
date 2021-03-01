import React from 'react'
import {Animated, StyleSheet, Text, View} from 'react-native'
import {styleConfig} from '../../../StyleConfig'

enum labelWrapperBgColor {
    green = '#D3FCDE',
    red = '#FEE8E7'
}

enum labelColor {
    green = '#309716',
    red = '#FF4869'
}

type propsType = {
    labelWrapperColor: 'green' | 'red',
    title: string
    style: any
}

export const CardTopModal: React.FC<propsType> = ({children, labelWrapperColor = 'green', title, style}) => {
    return (
        <Animated.View style={[style, styles.container, styleConfig.shadowModal]}>
            <View style={[styles.labelWrapper, {backgroundColor: labelWrapperBgColor[labelWrapperColor]}]}>
                <Text style={[styles.label, {color: labelColor[labelWrapperColor]}]}>{title}</Text>
            </View>
            <View style={styles.content}>
                {children}
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: 107,
        borderRadius: 8,
        marginHorizontal: 16,
        marginTop: 23,
    },
    labelWrapper: {
        height: 41,
        justifyContent: 'center',
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        paddingHorizontal: 16,
    },
    label: {
        fontSize: 16,
        lineHeight: 21,
        fontFamily: 'IBMPlex-600',
    },
    content: {
        marginTop: 16,
        height: '100%',
        paddingHorizontal: 16,
    },
})
