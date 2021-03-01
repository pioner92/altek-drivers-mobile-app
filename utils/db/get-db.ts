import AsyncStorage from '@react-native-async-storage/async-storage'

import {
    BANKCARDCVS,
    BANKCARDDATE,
    BANKCARDNAME,
    BANKCARDNUMBER,
    CARDS,
    COMPANYHASH,
    DELIVERYPOINT,
    EMAIL,
    FIRSTNAME,
    GROUPID,
    ISAVAILABLE,
    LASTNAME,
    MAXMILES,
    MINIMUMDIMSHEIGHT,
    MINIMUMDIMSLENGTH,
    MINIMUMDIMSWIDTH,
    MINIMUMPAYLOADS,
    PASSWORD,
    PHONENUMBER,
    PHOTOPROFILE,
    PICKUPPOINT,
    TIMERBID,
    TOKEN,
    USERID,
} from './constants'

export type dbType = typeof PHONENUMBER
    | typeof EMAIL
    | typeof USERID
    | typeof GROUPID
    | typeof PASSWORD
    | typeof TOKEN
    | typeof FIRSTNAME
    | typeof LASTNAME
    | typeof MAXMILES
    | typeof PICKUPPOINT
    | typeof DELIVERYPOINT
    | typeof MINIMUMDIMSLENGTH
    | typeof MINIMUMDIMSWIDTH
    | typeof MINIMUMDIMSHEIGHT
    | typeof MINIMUMPAYLOADS
    | typeof PHOTOPROFILE
    | typeof ISAVAILABLE
    | typeof COMPANYHASH
    | typeof BANKCARDNUMBER
    | typeof BANKCARDNAME
    | typeof BANKCARDDATE
    | typeof BANKCARDCVS
    | typeof CARDS
    | typeof TIMERBID

export const getDb = async (name: dbType) => {
    const value = await AsyncStorage.getItem(name)
    if (value !== null) {
        return value
    }
}
