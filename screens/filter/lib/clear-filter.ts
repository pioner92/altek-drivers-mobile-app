import {setDb} from "../../../utils/db";
import {
    DELIVERYPOINT,
    MAXMILES,
    MINIMUMDIMSHEIGHT,
    MINIMUMDIMSLENGTH,
    MINIMUMDIMSWIDTH, MINIMUMPAYLOADS,
    PICKUPPOINT
} from "../../../utils/db/constants";
import {
    setDeliveryPointEvent,
    setMaxMilesEvent, setMinimumDimsHeightEvent,
     setMinimumDimsWidthEvent, setMinimumPayloadsEvent,
} from "../../../Store/FilterStore";
import {setIsFilteredBids} from "../models";
import {setInputValueDeliveryPoint} from "../features/delivery-point/models";
import {setInputValuePickUpPoint} from "../features/pick-up-point/models";
import {
    setMinimumDimsHeightValue,
    setMinimumDimsLengthValue,
    setMinimumDimsWidthValue
} from "../features/minimum-dims/models";
import {
    setSliderValueMinimumPayloadsLeft,
    setSliderValueMinimumPayloadsRight
} from "../features/minimum-payloads/models";

export const clearFilter = () => {
    setDb(MAXMILES, '')
    setDb(PICKUPPOINT, '')
    setDb(DELIVERYPOINT, '')
    setDb(MINIMUMDIMSLENGTH, '')
    setDb(MINIMUMDIMSWIDTH, '')
    setDb(MINIMUMDIMSHEIGHT, '')
    setDb(MINIMUMPAYLOADS, '')

    setMaxMilesEvent(200)
    setInputValuePickUpPoint('')
    setInputValueDeliveryPoint('')
    setMinimumDimsLengthValue(null)
    setMinimumDimsWidthValue(null)
    setMinimumDimsHeightValue(null)
    setSliderValueMinimumPayloadsLeft(0)
    setSliderValueMinimumPayloadsRight(10000)
    setIsFilteredBids(false)
}