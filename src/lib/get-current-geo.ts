import {setGeoLocationEvent} from '../../Store/Store'
import Geolocation from '@react-native-community/geolocation'
import * as Permissions from 'expo-permissions'

export const getCurrentGeo = async (): Promise<{ latitude: number, longitude: number }> => {
    const {status} = await Permissions.getAsync(Permissions.LOCATION)
    if (status !== 'granted') {
        return {latitude: 37.785834, longitude: -122.406417}
    }

    return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
            setGeoLocationEvent({latitude, longitude})
            resolve({latitude, longitude})
        })
    })
}
