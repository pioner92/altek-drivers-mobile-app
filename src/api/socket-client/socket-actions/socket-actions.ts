import {createEvent} from 'effector'
import {socketSend} from '../socket-client'
import {$currentLoad} from '../../../../screens/load-info/models'
import {setStatusDataGenerate} from '../lib'

export type setStatusType = {
    status: number
    substatus?: number
}


const createSocketData = (action: string, data: object) => {
    return {action, data}
}

export const sendBidSocketAction = createEvent<{ load_id: number, price: number }>()
export const sendChatMessageSocketAction = createEvent<{ content: string, chat_id: number, media?: Array<number> }>()
export const sendStatusToServerSocketAction = createEvent<setStatusType>()

sendBidSocketAction.watch((payload) => {
    socketSend(createSocketData('driver_bid', payload))
})

sendChatMessageSocketAction.watch((payload) => {
    socketSend(createSocketData('group_chat_message', payload))
})

sendStatusToServerSocketAction.watch((payload) => {
    socketSend(setStatusDataGenerate({load_id: $currentLoad.getState()?.id || 0, ...payload}))
})
