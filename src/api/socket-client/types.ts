import {messageType} from '../rest/chat/get-chat-data'
import {loadType} from '../rest/loads/types'

export type newLoadOfferResponseType = {
    action: 'new_load_offer'
    data: loadType
}

export type statusesResponseType = {
    action: 'load_status_change',
    data: {
        status: number
        substatus: string
    }
}
export type statusDriverConnect = {
    action: 'driver_connect'
}

export type chatMessageType = {
    action: 'group_chat_message',
    data: messageType
}

export type updateLoadsType = {
    action: 'update_loads'
    data: [{
        deliverTo: string
        delivery_date: string
        end_location: string
        id: number
        pieces: number
        weight: number
        miles: number
        pickUpAt: string
        pick_up_date: string
        price: number
        start_location: string
        created_date:string
        pickUpAt_zip:string
        deliverTo_zip:string
        note:string
        isUrgent:boolean
        dims:string
        car:string
        isDanger:boolean
        isCanPutOnTop:boolean
        dock_level:boolean
    }]
}

export type driverBidType = {
    action: 'driver_bid'
    data: {
        load_id: string
        phone_number: string
    }
}


export type socketDataType =
    newLoadOfferResponseType
    | statusesResponseType
    | statusDriverConnect
    | chatMessageType
    | driverBidType
    | updateLoadsType
