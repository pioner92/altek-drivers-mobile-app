import React, {useState} from 'react'
import {Calendar} from './Calendar'
import moment from 'moment'
import {weeksGenerate} from './lib/weeks-generate'


type propsType = {
    count: 1 | 2
    onSelect?: (day: string) => void
}

export const CalendarContainer: React.FC<propsType> = ({count, onSelect}) => {
    const [selectedDay, setSelectedDay] = useState('')
    const daysName = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
    const title = moment().format('MMMM YYYY')
    const weeks = weeksGenerate()

    const onSelectHandler = (day: string) => {
        setSelectedDay(day)
        onSelect && onSelect(day)
    }

    return (
        <Calendar
            count={count}
            daysName={daysName}
            title={title}
            weeks={weeks}
            selectedDay={selectedDay}
            callback={onSelectHandler}
        />
    )
}
