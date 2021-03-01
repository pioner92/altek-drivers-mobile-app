import React from 'react'
import {StyleSheet, View} from 'react-native'
import {CalendarContainer} from '../../../../src/Calendar/CalendarContainer'
import {FilterTitle} from '../../ui/atoms/filter-title'
import {setSelectedValueDeliveryDate} from './models/models'

export const DeliveryDate: React.FC = () => {
    return (
        <View style={styles.container}>
            <FilterTitle>
                Delivery date
            </FilterTitle>
            <View style={styles.calendarWrapper}>
                <CalendarContainer onSelect={setSelectedValueDeliveryDate} count={1}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 24,
        height: 139,
        paddingTop: 11,
        paddingBottom: 11,
    },
    calendarWrapper: {
        marginTop: 10,
    },
})
