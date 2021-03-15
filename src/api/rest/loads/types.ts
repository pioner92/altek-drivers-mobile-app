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
