import {geoLocationStore} from "../../../../Store/Store";
import {getDistance} from "../../../../utils/get-distance/get-distance";

export const calculationDistance = (lat1:number,long1:number) => {
    const geo = geoLocationStore.getState()

    const distance = getDistance(lat1,long1,geo.latitude,geo.longitude)
    return distance
}