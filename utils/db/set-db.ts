import AsyncStorage from '@react-native-async-storage/async-storage'

import {dbType} from './get-db'

export const setDb = async (name: dbType, value: string) => {
    try {
        await AsyncStorage.setItem(name, value)
    }
    catch (e) {
        console.log('Set db error', e)
    }
}

