import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import moment from 'moment'
import WeekRows from './WeekRows/WeekRows'
import {DayTitles} from './WeekRows/DeyTitles/DeyTitles'
import {WeekRow} from './WeekRows/WeekRow/WeekRow'
import {styleConfig} from '../StyleConfig'


export type weekType = Array<{ name: string, value: string }>


export type calendarType = {
    daysName: string[]
    title: string
    weeks: {
        currentWeekArr: weekType,
        nextWeekArr?: weekType
    }
    selectedDay: string
    callback: Function
    count: 1 | 2
}

export const Calendar = ({daysName, title, weeks, selectedDay, callback, count}: calendarType) => {
    const onSelectDay = (day: string) => {
        if (+day >= +moment().format('DD')) {
            callback(day)
        }
    }


    return (
        <View style={[styles.container, styleConfig.shadowMenu, {shadowColor: '#000'}]}>
            <CalendarTitle>
                {title}
            </CalendarTitle>
            <DayTitles daysName={daysName}/>
            {count === 1 ?
                <WeekRow week={weeks.currentWeekArr} callback={onSelectDay} selectedDay={selectedDay}/> :
                <WeekRows weeks={weeks} callback={onSelectDay} selectedDay={selectedDay}/>
            }
        </View>
    )
}

const CalendarTitle: React.FC = ({children}) => {
    return (
        <View style={styles.titleView}>
            <Text style={styles.title}>{children}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
        // height: 117,
        width: '100%',
        paddingVertical: 8,
        marginBottom: 19,
        backgroundColor: '#FCFCFC',
        borderRadius: 6,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 0,
        // },
        // shadowOpacity: 0.15,
        // shadowRadius: 5.84,
        // elevation: 10,
    },
    titleView: {
        marginBottom: 6,
        height: 16,
    },
    title: {
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontFamily: 'IBMPlex-400',
        lineHeight: 18,
        color: styleConfig.textColor.dark,
    },

})
