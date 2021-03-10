import React from 'react'
import {TimeTypeButtons} from './TimeTypeButtons'
import {SelectTitle} from '../../../UIComponents/Title/SelectTitle'
import {StyleSheet, View} from 'react-native'

export type timePickerHeaderType = {
    timeTypeList: string[],
    selectedTimeType: string
    setSelectedTimeType: Function
}

export const TimePickerHeader = ({timeTypeList, selectedTimeType, setSelectedTimeType}: timePickerHeaderType) => {
    return (
        <View style={styles.container}>
            <SelectTitle>
                Select time
            </SelectTitle>
            <TimeTypeButtons selectedTimeType={selectedTimeType} setSelectedTimeType={setSelectedTimeType}
                timeTypeList={timeTypeList}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 15,
        marginBottom: 15,
    },
})

