export type loadsResult = {
    count: number,
    next: null | string
    previous: null | string,
    results: Array<loadType>
}

export type loadType = {
    BOL: null | string,
    car: string
    company: string
    created_date: string
    deliverTo: string
    deliverTo_city: string
    deliverTo_zip: string
    delivery_date: null | string,
    dims: string
    dock_level: boolean
    driver_price: number
    hash: number
    height: number
    id: number
    isCanPutOnTop: boolean
    isDanger: boolean
    isUrgent: boolean
    length: number
    miles: number
    miles_out: number
    modifiedDateTime: string
    note: string
    pallets: number
    pickUpAt: string
    pickUpAt_changed: string
    pickUpAt_zip: string
    pick_up_date: null | string
    pieces: number
    pieces_changed: number | null
    price: number
    start_location: string
    end_location:string
    status: number
    substatus: number
    weight: number
    weight_changed:number
    width: number
}

export type createLinkType = {
    pickUpPoint?: string
    deliveryPoint?: string
    minLength?: string
    minWidth?: string
    minHeight?: string
}

export type getLoadsEffectPropsType = {
    pickUpPoint:string
    deliveryPoint:string,
    minDimsLengthValue:number | null
    minDimsWidthValue: number | null
    minDimsHeightValue:number | null
    geolocation:{latitude: number, longitude: number}

}
