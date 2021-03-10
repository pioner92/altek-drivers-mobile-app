import React from 'react'
import {StyleSheet, View} from 'react-native'
import {MultiSliderWithRange} from '../../../../../../src/ui/molecules/multi-slider/multi-slider-with-range'
import {useStore} from 'effector-react'
import {
    $sliderValueMinimumPayloadsLeft,
    $sliderValueMinimumPayloadsRight,
    setSliderValueMinimumPayloadsLeft,
    setSliderValueMinimumPayloadsRight,
} from './models'
import {MAX_VALUE} from './models/models'
import {FilterTitle} from '../../ui/atoms/filter-title'

export const MinimumPayloads: React.FC = () => {
    const valueLeft = useStore($sliderValueMinimumPayloadsLeft)
    const valueRight = useStore($sliderValueMinimumPayloadsRight)

    const onChange = (e: Array<number>) => {
        setSliderValueMinimumPayloadsLeft(e[0])
        setSliderValueMinimumPayloadsRight(e[1])
    }

    return (
        <View style={styles.container}>
            <FilterTitle>
                Minimum payloads
            </FilterTitle>
            <View style={styles.sliderWrapper}>
                <MultiSliderWithRange
                    MAX_VALUE={MAX_VALUE}
                    valueLeft={valueLeft}
                    valueRight={valueRight}
                    rangeTitle='Weight range: '
                    onChange={onChange}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 32,
    },
    sliderWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
    },
})
