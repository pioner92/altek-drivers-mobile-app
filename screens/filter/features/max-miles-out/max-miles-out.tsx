import React from 'react';
import {StyleSheet, View} from "react-native";
import {useStore} from "effector-react";
import {
    $sliderValueMaxMilesLeft,
    $sliderValueMaxMilesRight,
    MAX_MILES,
    setSliderValueMaxMilesLeft,
    setSliderValueMaxMilesRight
} from "./models";
import {MultiSliderWithRange} from "../../../../src/ui/molecules/multi-slider/multi-slider-with-range";
import {FilterTitle} from "../../ui/atoms/filter-title";

export const MaxMilesOut: React.FC = () => {
    const valueLeft = useStore($sliderValueMaxMilesLeft)
    const valueRight = useStore($sliderValueMaxMilesRight)

    const onChange = (e: Array<number>) => {
        setSliderValueMaxMilesLeft(e[0])
        setSliderValueMaxMilesRight(e[1])
    }

    return (
        <View style={styles.container}>
            <FilterTitle>
                Max miles out
            </FilterTitle>
            <View style={styles.sliderWrapper}>
                <MultiSliderWithRange
                    rangeTitle='Distance range: '
                    labelLeft='mi'
                    labelRight='mi'
                    valueRight={valueRight}
                    valueLeft={valueLeft}
                    MAX_VALUE={MAX_MILES}
                    onChange={onChange}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 24,
    },
    sliderWrapper:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:8,
    }
})
