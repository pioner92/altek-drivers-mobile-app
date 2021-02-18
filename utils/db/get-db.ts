// @ts-ignore
import AsyncStorage from "@react-native-community/async-storage";
import {
    PHONENUMBER,
    EMAIL,
    USERID,
    GROUPID,
    PASSWORD,
    TOKEN,
    FIRSTNAME,
    LASTNAME,
    MAXMILES,
    PICKUPPOINT,
    DELIVERYPOINT,
    MINIMUMDIMSLENGTH,
    MINIMUMDIMSWIDTH,
    MINIMUMDIMSHEIGHT,
    MINIMUMPAYLOADS,
    PHOTOPROFILE,
    ISAVAILABLE, COMPANYHASH, BANKCARDNUMBER, BANKCARDNAME, BANKCARDDATE, BANKCARDCVS, CARDS, TIMERBID
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
