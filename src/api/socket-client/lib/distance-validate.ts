import {calculationDistance} from './calculation-distance'

export const distanceValidate = (location:string, maxDistance:number) => {
    if (!location && !maxDistance ) {
        return false
    }
    const geo = location.split(',')
    if (geo.length > 1) {
        return calculationDistance(+geo[0], +geo[1]) < maxDistance
    }
    return false
}
