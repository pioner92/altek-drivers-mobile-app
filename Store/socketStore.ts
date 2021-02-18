import {createEffect, createEvent, createStore} from 'effector'
import {getDb} from "../utils/db/get-db";
import {messageType} from "../src/api/rest/chat/get-chat-data";
import {TOKEN} from "../utils/db/constants";

// export const initSocketEvent = createEffect(async (id: number) => {
//     const token = await getDb(TOKEN)
//     return new WebSocket(`wss://altekloads.com/ws/chat/${id}/?access_token=${token}`)
// })
//
//
// export const closeSocketEvent = createEvent()
// export const sendSocketEvent = createEvent<{ content: string, chat_id: number }>()
//
// const socketStore = createStore<WebSocket | null>(null)
//     .on(initSocketEvent.doneData, ((_, payload) => payload))
//     .on(closeSocketEvent, (state => state?.close()))
//     .on(sendSocketEvent, (state, payload) => state?.send(JSON.stringify(payload)))
//

// socketStore.watch((state) => {
//     state?.addEventListener('open', () => {
//         console.log('Connect...')
//     })
//     state?.addEventListener('close', (status) => {
//         console.log('Close...')
//         console.log(status)
//     })
//     state?.addEventListener('error', (error) => {
//         console.log('Error...')
//         console.log(error)
//     })
//     state?.addEventListener('message', (message) => {
//         console.log('MESSAGE NEW')
//         console.log('NEW MESSAGE')
//         const newData = JSON.parse(message.data) as messageType
//         console.log(newData)
//         addNewMessageToStoreEvent([{
//             ...newData
//         }])
//     })
// })

