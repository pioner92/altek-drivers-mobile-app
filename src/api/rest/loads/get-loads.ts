import {createEffect} from 'effector'
import {urls} from '../../urls'
import {addLoadsToStoreEvent, geoLocationStore} from '../../../../Store/Store'
import {makeRequest} from '../../make-request'
import {hidePreloader, showPreloader} from '../../../features/preloader/models/models'
import {getDb} from '../../../../utils/db'
import {MAXMILES, USERID} from '../../../../utils/db/constants'
import {$inputValuePickUpPoint} from '../../../../screens/filter/features/pick-up-point/models'
import {$inputValueDeliveryPoint} from '../../../../screens/filter/features/delivery-point/models'
import {
    $minimumDimsHeightValue,
    $minimumDimsLengthValue,
    $minimumDimsWidthValue,
} from '../../../../screens/filter/features/minimum-dims/models'


export type loadsResult = {
    count: number,
    next: null | string
    previous: null | string,
    results: Array<loadType>
}

export type loadType = {
    BOL: null | string,
    actions_json: string,
    approximate_time: number,
    bk_status: null,
    broker_price: number,
    brokerage: string
    car: string
    carrier: number
    company: string
    created_date: string
    deliverTo: string
    deliverTo_changed: string
    deliverTo_city: string
    deliverTo_zip: string
    delivery_date: null | string,
    dimensions_units: string
    dims: string
    dispatcher_note: string
    dock_level: boolean
    documents: Array<string>
    driver_note: string
    driver_price: number
    email_notifications_flag: boolean
    email_notifications_interval: string
    end_location: string
    finish_time: null,
    hash: number
    height: number
    id: number
    isCanPutOnTop: boolean
    isDanger: boolean
    isUrgent: boolean
    items_count: number
    last_car: null
    length: number
    liftgate: boolean
    location_update_emails: string
    mail_part: string
    miles: number
    miles_out: number
    modifiedDateTime: string
    note: string
    pallets: number
    pickUpAt: string
    pickUpAt_changed: string
    pickUpAt_city: string
    pickUpAt_zip: string
    pick_up_date: null | string
    pieces: number
    pieces_changed: number | null
    points: Array<{
        city: string
        country: string
        datetime: null,
        full_name: string
        id: number
        load: number
        'location': string
        'state': string
        'type': string
        'zip_code': string
    }>

    price: number
    recieved_by: null | string
    removedDateTime: null | string
    reply_email: string
    requirements: string
    resp_car: number
    resp_carrier_dispatcher: number
    resp_driver: number
    resp_shipper_dispatcher: number
    start_location: string
    start_time: string
    stat_No: null
    status: number
    status_info: string
    status_update_emails: string
    substatus: number
    sys_ref: string
    team: boolean
    total_cargo: number
    unloaded_by: null | string
    users_saw: string
    wait_and_return: boolean
    weight: number
    weight_changed: number | null
    weight_units: string
    width: number
}

type createLinkType = {
    pickUpPoint?: string
    deliveryPoint?: string
    minLength?: string
    minWidth?: string
    minHeight?: string
}

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


export const getLoads = createEffect(async (): Promise<loadsResult | undefined> => {
    try {
        const userId = await getDb(USERID) || 179
        let maxMiles = await getDb(MAXMILES) || '500'
        const pickUpPoint = $inputValuePickUpPoint.getState().trim()
        const deliveryPoint = $inputValueDeliveryPoint.getState().trim()
        const minLength = $minimumDimsLengthValue.getState()?.toString()
        const minWidth = $minimumDimsWidthValue.getState()?.toString()
        const minHeight = $minimumDimsHeightValue.getState()?.toString()

        const filterUrl = createLink({pickUpPoint, deliveryPoint, minWidth, minLength, minHeight})
        // let maxMiles = "200"

        const geolocation = geoLocationStore.getState()
        const geo = `${geolocation.latitude.toFixed(6)},${geolocation.longitude.toFixed(6)}`
        // const geo = `32.1723,81.1747`

        // debug
        if (userId === '179') {
            maxMiles = '99999999999999999999999999999'
        }

        return await makeRequest({url: urls.Loads(geo, maxMiles, filterUrl), method: 'GET', token: true})
    } catch (e) {
        console.log('Get loads ERROR: ', e)
    }
})

getLoads.watch(() => {
    showPreloader()
})


getLoads.done.watch(({result}) => {
    if (result) {
        addLoadsToStoreEvent(result!.results)
    }
    hidePreloader()
})
