import {$geoLocationStore} from '../../../../Store/Store'
import {getDistance} from '../../../lib/get-distance/get-distance'

export const calculationDistance = (lat1: number, long1: number) => {
    const geo = $geoLocationStore.getState()

    return getDistance(lat1, long1, geo.latitude, geo.longitude)
}
