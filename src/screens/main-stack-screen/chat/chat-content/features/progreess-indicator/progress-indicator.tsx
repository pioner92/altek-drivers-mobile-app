import {Animated, StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native'
import React, {useEffect, useState} from 'react'
import {useInterpolate, useTiming, useValue} from '../../../../../../lib/animation-hooks/Hooks'


type propsType = {
    progressState: number
    isVisiblePercent?: boolean
    title?: string
    hidden?: boolean
    style?: ViewStyle
    progressBackground?: ViewStyle
    progressLineColor?: ViewStyle
    percentValueStyle?: TextStyle
    titleStyle?: TextStyle
}

export const ProgressIndicator: React.FC<propsType> = ({
    progressState,
    style,
    titleStyle,
    percentValueStyle,
    progressBackground,
    progressLineColor,
    hidden = false,
    title = 'Uploading files...',
    isVisiblePercent = true,
}) => {
    const [thisWidth, setThisWidth] = useState(0)

    const animationValue = useValue(progressState)

    const interpolate = useInterpolate(animationValue, [0, 100], [0, thisWidth])

    const animationStyle = {
        width: interpolate,
    }

    useEffect(() => {
        useTiming(animationValue, progressState, 300, false).start()
    }, [progressState])


    if (hidden) {
        return null
    }

    return (
        <View style={[styles.container, style]}>
            <View onLayout={(state) => setThisWidth(state.nativeEvent.layout.width)}
                style={[styles.progressBackground, progressBackground]}/>
            <Animated.View
                style={[styles.progressLine, animationStyle, progressLineColor]}/>
            <View style={styles.textWrapper}>
                <Text style={[styles.text, titleStyle]}>{title}</Text>
            </View>
            {isVisiblePercent &&
            <View style={styles.percentWrapper}>
                <Text style={[styles.percentValue, percentValueStyle]}>{progressState}%</Text>
            </View>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        width: '100%',
        position: 'absolute',
    },
    progressBackground: {
        height: 17,
        backgroundColor: '#B5D3F0',
        borderRadius: 4,
    },
    progressLine: {
        height: 17,
        width: 0,
        left: 16,
        borderRadius: 4,
        position: 'absolute',
        backgroundColor: '#1672D4',
    },
    textWrapper: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: '100%',
    },
    text: {
        color: '#ffffff',
        fontSize: 12,
        lineHeight: 16,
        fontFamily: 'IBMPlex-500',
    },
    percentWrapper: {
        position: 'absolute',
        width: '100%',
        alignSelf: 'center',
        alignItems: 'flex-end',
    },
    percentValue: {
        color: '#fff',
        fontSize: 12,
        lineHeight: 16,
        fontFamily: 'IBMPlex-500',
        marginRight: 5,
    },
})
