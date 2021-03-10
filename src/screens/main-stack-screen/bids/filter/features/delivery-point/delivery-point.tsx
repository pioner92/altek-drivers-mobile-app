import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Input} from '../../../../../../ui/atoms/input'
import {useStore} from 'effector-react'
import {$inputValueDeliveryPoint, setInputValueDeliveryPoint} from './models'
import {FilterTitle} from '../../ui/atoms/filter-title'

export const DeliveryPoint: React.FC = () => {
    const inputValue = useStore($inputValueDeliveryPoint)

    return (
        <View style={styles.container}>
            <FilterTitle>
                Delivery point
            </FilterTitle>
            <Input style={{padding: 0, marginTop: 8}} placeholder='Location' onChange={setInputValueDeliveryPoint}
                value={inputValue}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 32,
    },
})
