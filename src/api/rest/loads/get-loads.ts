import {attach, createEffect} from 'effector'
import {urls} from '../../urls'
import {$geoLocationStore, addLoadsToStoreEvent} from '../../../../Store/Store'
import {makeRequest} from '../../make-request'
import {getDb} from '../../../lib/db'
import {MAXMILES, USERID} from '../../../lib/db/constants'
import {$inputValuePickUpPoint} from '../../../screens/main-stack-screen/bids/filter/features/pick-up-point/models'
import {$inputValueDeliveryPoint} from '../../../screens/main-stack-screen/bids/filter/features/delivery-point/models'
import {
    $minimumDimsHeightValue,
    $minimumDimsLengthValue,
    $minimumDimsWidthValue,
} from '../../../screens/main-stack-screen/bids/filter/features/minimum-dims/models'
import {createLinkType, getLoadsEffectPropsType, loadsResult} from './types'


const createLink = ({pickUpPoint, deliveryPoint, minLength, minWidth, minHeight}: createLinkType) => {
    let url = `&filter_type=multipart`

    if (pickUpPoint) {
        url += `&pickUpAt__icontains=${pickUpPoint}`
    }
    if (deliveryPoint) {
        url += `&deliverTo__icontains=${deliveryPoint}`
    }
    if (Number(minLength) > 0) {
        url += `&length__lte=${minLength}`
    }
    if (Number(minWidth) > 0) {
        url += `&width__lte=${minWidth}`
    }
    if (Number(minHeight) > 0) {
        url += `&height__lte=${minHeight}`
    }
    return url
}


export const getLoadsEffect = createEffect<getLoadsEffectPropsType, loadsResult>(async ({pickUpPoint, deliveryPoint, minDimsLengthValue, minDimsWidthValue, minDimsHeightValue, geolocation}) => {
    const userId = await getDb(USERID) || 179
    let maxMiles = await getDb(MAXMILES) || '500'
    const minLength = minDimsLengthValue?.toString()
    const minWidth = minDimsWidthValue?.toString()
    const minHeight = minDimsHeightValue?.toString()

    const filterUrl = createLink({
        pickUpPoint: pickUpPoint.trim(),
        deliveryPoint: deliveryPoint.trim(),
        minWidth,
        minLength,
        minHeight,
    })

    const geo = `${geolocation.latitude.toFixed(6)},${geolocation.longitude.toFixed(6)}`

    // debug
    if (userId === '179') {
        maxMiles = '99999999999999999999999999999'
    }

    return await makeRequest({url: urls.loads(geo, maxMiles, filterUrl), method: 'GET', token: true})
})

getLoadsEffect.fail.watch(({error})=>{
    console.log('Get loads error ', error)
})


export const getLoads = attach({
    source: {$inputValuePickUpPoint, $inputValueDeliveryPoint, $minimumDimsLengthValue, $minimumDimsWidthValue, $minimumDimsHeightValue, $geoLocationStore},
    mapParams: (_, data)=>({
        pickUpPoint: data.$inputValuePickUpPoint,
        deliveryPoint: data.$inputValueDeliveryPoint,
        minDimsLengthValue: data.$minimumDimsLengthValue,
        minDimsWidthValue: data.$minimumDimsWidthValue,
        minDimsHeightValue: data.$minimumDimsHeightValue,
        geolocation: data.$geoLocationStore,
    }),
    effect: getLoadsEffect,
})


getLoads.done.watch(({result, params}) => {
    if (result) {
        addLoadsToStoreEvent(result.results)
    }
})
