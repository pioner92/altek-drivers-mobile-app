import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Input} from '../../../../src/ui/atoms/input'
import {useStore} from 'effector-react'
import {$inputValuePickUpPoint, setInputValuePickUpPoint} from './models'
import {FilterTitle} from '../../ui/atoms/filter-title'

export const PickUpPoint: React.FC = () => {
    const inputValue = useStore($inputValuePickUpPoint)

    return (
        <View style={styles.container}>
            <FilterTitle>
                Pick-up point
            </FilterTitle>
            <Input style={{padding: 0, marginTop: 8}} placeholder='Location' value={inputValue}
                onChange={setInputValuePickUpPoint}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 32,
    },
    inputWrapper: {
        marginTop: 8,
    },
})
