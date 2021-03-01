import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {FilterTitle} from '../../ui/atoms/filter-title'
import {BlueSelect} from '../../../../src/features/blue-select/blue-select'
import {valueType} from '../../../../src/features/blue-select/ui/moleculs/scroll-area'
import {
    $minimumDimsHeightValue,
    $minimumDimsLengthValue,
    $minimumDimsWidthValue,
    selectScrollValues,
    setMinimumDimsHeightValue,
    setMinimumDimsLengthValue,
    setMinimumDimsWidthValue,
} from './models'
import {useStore} from 'effector-react'


export const MinimumDims = () => {
    const lengthValue = useStore($minimumDimsLengthValue)
    const widthValue = useStore($minimumDimsWidthValue)
    const heightValue = useStore($minimumDimsHeightValue)

    const onSelectLength = (value: valueType) => {
        setMinimumDimsLengthValue(value.value)
    }

    const onSelectWidth = (value: valueType) => {
        setMinimumDimsWidthValue(value.value)
    }

    const onSelectHeight = (value: valueType) => {
        setMinimumDimsHeightValue(value.value)
    }

    return (

        <View style={styles.container}>
            <FilterTitle>Maximum dims</FilterTitle>
            <View style={styles.selectsWrapper}>
                <BlueSelect
                    onChangeText={(text: string) => setMinimumDimsLengthValue(+text)}
                    selectedValue={lengthValue}
                    onSelect={onSelectLength}
                    values={selectScrollValues()}
                    label={'length'}
                />
                <BlueSelect
                    onChangeText={(text: string) => setMinimumDimsWidthValue(+text)}
                    selectedValue={widthValue}
                    onSelect={onSelectWidth}
                    values={selectScrollValues()}
                    label={'width'}
                />
                <BlueSelect
                    onChangeText={(text: string) => setMinimumDimsHeightValue(+text)}
                    selectedValue={heightValue}
                    onSelect={onSelectHeight}
                    values={selectScrollValues()}
                    label={'height'}
                />
                <Text style={{marginTop: 7}}>in</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 38,
    },
    selectsWrapper: {
        width: 256,
        justifyContent: 'space-between',
        marginTop: 16,
        flexDirection: 'row',
        // marginBottom:40
    },
    textInput: {
        borderWidth: 1,
        padding: 6,
        borderRadius: 20,
        borderColor: '#5B98DA',
        textAlign: 'center',
        width: 72,
        marginRight: 18,
    },
})
