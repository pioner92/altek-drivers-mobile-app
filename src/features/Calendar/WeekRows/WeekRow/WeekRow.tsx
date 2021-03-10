import React from 'react'
import moment from 'moment'
import {StyleSheet, Text, View} from 'react-native'
import {weekType} from '../../Calendar'


export type weekRow = {
    week: weekType
    callback: Function,
    selectedDay: string
}

enum dayColorEnum {
    lastDays = '#BEC3CC',
    currentDay = '#1672D4',
    nextDays = '#091735'
}

export const WeekRow: React.FC<weekRow> = ({week, callback, selectedDay}) => {
    const now = moment().format('DD')

    const getColor = (el: string) => {
        if (now === el) {
            return dayColorEnum.currentDay
        } else if (now < el) {
            return dayColorEnum.nextDays
        }
        return dayColorEnum.lastDays
    }

    return (
        <View style={[styles.container]}>
            {week.map((el, index) => {
                return (
                    <View key={index} style={[styles.dayWrapper, el.value === selectedDay ? {borderWidth: 1} : {}]}>
                        <Text
                            style={[styles.dayValue, {color: getColor(el.value)}]}
                            onPress={() => callback(el.value)}>{el.value}</Text>
                    </View>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        height: 32,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
        width: '100%',
    },
    dayWrapper: {
        height: 32,
        width: 32,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderColor: '#1672D4',
    },
    dayValue: {
        fontFamily: 'IBMPlex-500',
        color: '#112A5F',
        fontWeight: '500',
        lineHeight: 22,
        fontSize: 13,
    },
})
