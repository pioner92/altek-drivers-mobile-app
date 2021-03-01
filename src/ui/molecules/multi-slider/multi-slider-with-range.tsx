import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {MultiSlider, multiSliderPropsType} from './multi-slider'

type ownerPropsType = {
    rangeTitle: string
}

export const MultiSliderWithRange: React.FC<multiSliderPropsType & ownerPropsType> = ({...props}) => {
    const {valueLeft, labelLeft, valueRight, labelRight} = props

    return (
        <>
            <MultiSlider {...props}/>
            <View style={styles.rangeWrapper}>
                <Text style={styles.rangeTitle}>{props.rangeTitle}
                    <Text style={styles.rangeValues}>
                        {valueLeft} {labelLeft} - {valueRight} {labelRight}
                    </Text>
                </Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {},
    rangeWrapper: {
        width: '100%',
    },
    rangeTitle: {
        color: '#798293',
        fontSize: 10,
        lineHeight: 13,
        fontFamily: 'IBMPlex-400',
    },
    rangeValues: {
        color: '#1672D4',
        fontSize: 10,
        lineHeight: 13,
        fontFamily: 'IBMPlex-500',
    },
})
