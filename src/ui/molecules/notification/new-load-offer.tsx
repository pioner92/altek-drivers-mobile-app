import React from 'react'
import {Animated, StyleSheet, Text, View} from 'react-native'
import {styleConfig} from '../../../StyleConfig'

type propsType = {
    animModalStyle: any
    title: string
    color: string
}

export const NewLoadOfferModal: React.FC<propsType> = ({animModalStyle, children, color, title}) => {
    return (
        <Animated.View style={[animModalStyle, styles.container]}>
            <View style={[styles.content, styleConfig.shadowMenu]}>
                <Text style={[styles.title, {color}]}>{title}</Text>
                <Text style={styles.text}>{children}</Text>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 16,
        position: 'absolute',
        top: 24,
        zIndex: 3,
    },
    content: {
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingHorizontal: 20,
        width: '100%',
        paddingVertical: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        color: '#379927',
        fontSize: 16,
        fontFamily: 'IBMPlex-600',
        lineHeight: 21,
    },
    text: {
        color: '#1F2934',
        fontSize: 13,
        fontFamily: 'IBMPlex-400',
        lineHeight: 17,
        marginTop: 6,
    },
})
