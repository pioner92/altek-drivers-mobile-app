import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {timePickerHeaderType} from './TimePickerHeader'
import {styleConfig} from '../../StyleConfig'


export const TimeTypeButtons: React.FC<timePickerHeaderType> = ({timeTypeList, selectedTimeType, setSelectedTimeType}) => {
    return (
        <View style={styles.timeTypeWrapper}>
            {timeTypeList.map((el, index) => {
                return (
                    <TouchableOpacity key={index} onPress={() => setSelectedTimeType(el)} style={[{
                        backgroundColor: selectedTimeType === el ? '#DDEEFF' : 'transparent',

                    },
                    styles.timeTypeButton]}>
                        <Text
                            style={[styles.timeTypeButtonTitle, {color: selectedTimeType === el ? '#1672D4' : styleConfig.textColor.dark}]}>{el}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    timeTypeWrapper: {
        flexDirection: 'row',
        width: 77,
        justifyContent: 'space-between',
        marginRight: 24,
    },
    timeTypeButton: {
        height: 20,
        width: 36,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    timeTypeButtonTitle: {
        fontFamily: 'IBMPlex-600',
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 18,
    },
})

