import {createEvent, sample} from 'effector'
import {socketSend} from '../socket-client'
import {$currentLoad} from '../../../screens/main-stack-screen/load-info/models'
import {setStatusDataGenerate} from '../lib'

export type setStatusType = {
    status: number
    substatus?: number
}


const createSocketData = (action: string, data: object) => {
    return {action, data}
}

export const sendBidSocketAction = createEvent<{ load_id: number, price: number }>()
export const sendChatMessageSocketAction = createEvent<{ content: string, chat_id: number, media?: Array<number>, files?:Array<number> }>()
export const sendStatusToServerSocketAction = createEvent<setStatusType>()
const sendStatusToServerSocketHandler = createEvent<{id:number, status:setStatusType}>()

sendBidSocketAction.watch((payload) => {
    socketSend(createSocketData('driver_bid', payload))
})

sendChatMessageSocketAction.watch((payload) => {
    socketSend(createSocketData('group_chat_message', payload))
})

sample({
    source: $currentLoad,
    clock: sendStatusToServerSocketAction,
    fn: (load, status)=>({id: load?.id ?? 0, status}),
    target: sendStatusToServerSocketHandler,
})

sendStatusToServerSocketHandler.watch(({id, status})=>{
    socketSend(setStatusDataGenerate({load_id: id, ...status}))
})

