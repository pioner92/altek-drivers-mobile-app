import AsyncStorage from '@react-native-async-storage/async-storage'

import {dbType} from './get-db'

export const setDb = async (name: dbType, value: string) => await AsyncStorage.setItem(name, value)

