import {DateTime} from 'luxon'


export const VALUEINSTEAD = 'ASAP'


export const nullableDateValidate = (date: string | null) => {
    if (date) {
        // return  date
        return DateTime.fromISO(date, {setZone: false}).toFormat('EEE dd MMM HH:mm')
        // return  DateTime.fromFormat(dates,"dd MM yyyy HH:mm",{locale:'en'}).toFormat("EEE dd MMM HH:mm ")
        // return dateFormat(dates,'ddd d mmm H:MM')
    }
    return VALUEINSTEAD
}
