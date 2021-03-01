import {useEffect} from 'react'
import {getDb} from '../../../utils/db'
import {
    DELIVERYPOINT,
    MAXMILES,
    MINIMUMDIMSHEIGHT,
    MINIMUMDIMSLENGTH,
    MINIMUMDIMSWIDTH,
    MINIMUMPAYLOADS,
    PICKUPPOINT,
} from '../../../utils/db/constants'
import {
    setDeliveryPointEvent,
    setMaxMilesEvent,
    setMinimumDimsHeightEvent,
    setMinimumDimsLengthEvent,
    setMinimumDimsWidthEvent,
    setMinimumPayloadsEvent,
    setPickUpPointEvent,
} from '../../../Store/FilterStore'

export const useInitFilter = () => {
    useEffect(() => {
        getDb(MAXMILES).then((data) => data && setMaxMilesEvent(+data))
        getDb(PICKUPPOINT).then((data) => data && setPickUpPointEvent(data))
        getDb(DELIVERYPOINT).then((data) => data && setDeliveryPointEvent(data))
        getDb(MINIMUMDIMSLENGTH).then((data) => data && setMinimumDimsLengthEvent(data))
        getDb(MINIMUMDIMSWIDTH).then((data) => data && setMinimumDimsWidthEvent(data))
        getDb(MINIMUMDIMSHEIGHT).then((data) => data && setMinimumDimsHeightEvent(data))
        getDb(MINIMUMPAYLOADS).then((data) => data && setMinimumPayloadsEvent(data))
    }, [])
}
