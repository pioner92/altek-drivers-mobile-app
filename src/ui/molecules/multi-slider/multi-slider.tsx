import React from 'react'
import {Dimensions, StyleSheet, Text, View} from 'react-native'
import Slider from '@ptomasroos/react-native-multi-slider'
import {SliderMarker} from '../../atoms'
import {styleConfig} from '../../../StyleConfig'

const {width} = Dimensions.get('window')


export type multiSliderPropsType = {
    MIN_VALUE?: number
    MAX_VALUE?: number
    labelLeft?: string
    labelRight?: string
    valueLeft: number
    valueRight: number
    onChange?: (value: Array<number>) => void
    onFinishChange?: (value: Array<number>) => void
}

export const MultiSlider: React.FC<multiSliderPropsType> = (
    {
        MIN_VALUE = 0,
        MAX_VALUE = 100,
        valueRight,
        valueLeft,
        onChange,
        onFinishChange,
        labelLeft,
        labelRight,
    },
) => {
    const onChangeSliderFinish = (e: Array<number>) => {
        onFinishChange && onFinishChange(e)
    }

    const onChangeSlider = (e: Array<number>) => {
        onChange && onChange(e)
    }


    return (
        <View style={styles.container}>
            <View style={styles.labelWrapper}>
                <Text style={styles.label}>{MIN_VALUE} {labelLeft}</Text>
                <Text style={styles.label}>{MAX_VALUE} {labelRight}</Text>
            </View>
            <Slider
                min={MIN_VALUE}
                max={MAX_VALUE}
                containerStyle={{height: 30}}
                sliderLength={width - 40}
                markerOffsetX={8}
                selectedStyle={{backgroundColor: '#1672D4'}}
                trackStyle={{backgroundColor: '#BBD6FF'}}
                values={[valueLeft, valueRight]}
                vertical={false}
                customMarkerLeft={SliderMarker}
                customMarkerRight={SliderMarker}
                isMarkersSeparated={true}
                enabledTwo={true}
                onValuesChange={onChangeSlider}
                onValuesChangeFinish={onChangeSliderFinish}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    marker: {
        width: 20,
        height: 20,
        borderRadius: 50,
        backgroundColor: '#1672D4',
        borderColor: '#BBD6FF',
        borderWidth: 2,
    },
    labelWrapper: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    label: {
        fontSize: 10,
        lineHeight: 13,
        fontFamily: 'IBMPlex-400',
        color: styleConfig.textColor.dark,
    },
})
