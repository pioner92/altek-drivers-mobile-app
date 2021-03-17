import {createEvent, createStore, sample} from 'effector'
import {NewConnectService, newLoadHandler} from './lib'
import {getDb} from '../../lib/db/get-db'
import {logOutHandler} from '../../lib/log-out-handler'
import {COMPANYHASH, TIMERBID, TOKEN} from '../../lib/db/constants'
import {messageType} from '../rest/chat/get-chat-data'
import {
    $chatsData,
    $isInChat,
    $selfId,
    addNewChatMessage,
    setIsNewMessageInChat,
    setUnreadCount,
} from '../../screens/main-stack-screen/chat/models/models'
import {startTimer} from '../../features/button-with-counter/models/models'
import {setDb} from '../../lib/db'
import {pushActions, pushNotification} from '../../lib/notification/push-notification'
import {pushNotificationNewLoad} from './lib/push-notification-new-load'
import {$isAuth, addNewLoad} from '../../../Store/Store'
import {AppState} from 'react-native'
import {urls} from '../urls'
import {$selfStatus, statuses} from '../../../hooks'
import {checkStatusesWithInit} from '../../lib/check-statuses-with-init/check-statuses-with-init'
import {distanceValidate} from './lib/distance-validate'
import {$maxMiles} from '../../../Store/FilterStore'
import {getChatsResponseType} from '../rest/chat/get-chats'
import {socketDataType, updateLoadsType} from './types'

let timer: null | NodeJS.Timer = null

const reconnectSocket = async () => {
    const hash = await getDb(COMPANYHASH)
    const token = await getDb(TOKEN)
    if (timer) {
        return
    }
    timer = setTimeout(() => {
        if (hash && token) {
            initSocket({companyHash: hash, token})
        }
        // @ts-ignore
        clearTimeout(timer)
        timer = null
    }, 5000)
}

// Events

export const initSocket = createEvent<{companyHash:string, token:string}>()

export const updateLoadsClock = createEvent<updateLoadsType>()
export const newChatMessageClock = createEvent<messageType>()

export const updateLoadsHandler = createEvent<{data:updateLoadsType, maxMiles:number, selfStatus:string}>()
export const newChatMessageHandler = createEvent<{isInChat:boolean, selfId:number | null, isAuth:boolean, chatData:getChatsResponseType, socketData:messageType}>()


export const closeSocket = createEvent()
export const socketSend = createEvent<{action:string, data:any}>()

// Stores
export const $socketStore = createStore<WebSocket | null>(null)
    .on(initSocket, (state, payload) => new WebSocket(urls.socketUrl(payload.companyHash, payload.token)))
    .on(closeSocket, (state) => {
        state?.close()
    })
    .on(socketSend, (state, payload) => {
        state?.send(JSON.stringify(payload))
    })


// Watches
$socketStore.watch((state) => {
    state?.addEventListener('open', () => {
        NewConnectService.newConnect()
        console.log('Connect...')
    })
    state?.addEventListener('close', (status) => {
        console.log('Close...', status)
        reconnectSocket()
    })
    state?.addEventListener('error', (error) => {
        console.log('Error...', error)
        reconnectSocket()
    })

    state?.addEventListener('message', (message) => {
        console.log('MESSAGE')

        const data = JSON.parse(message?.data) as socketDataType
        console.log(data)

        switch (data?.action) {
        case 'new_load_offer':
            newLoadHandler(data?.data)
            break
        case 'update_loads':
            updateLoadsClock(data)
            break
        case 'load_status_change':
            checkStatusesWithInit(data.data.status, +data.data.substatus)
            break
        case 'driver_connect':
            if (!NewConnectService.get()) {
                logOutHandler()
                    .then(closeSocket)
            }
            break
        case 'group_chat_message':
            data.data.user_from.id
            newChatMessageClock(data.data)
            break
        case 'driver_bid':
            setDb(TIMERBID, Date.now().toString())
            startTimer()
        }
    })
})


sample({
    source: {$maxMiles, $selfStatus},
    clock: updateLoadsClock,
    fn: ({$maxMiles, $selfStatus}, data) => ({data, maxMiles: $maxMiles, selfStatus: $selfStatus}),
    target: updateLoadsHandler,
})


sample({
    source: {$isInChat, $selfId, $isAuth, $chatsData},
    clock: newChatMessageClock,
    fn: ({$isInChat, $selfId, $isAuth, $chatsData}, socketData)=>({isAuth: $isAuth, selfId: $selfId, socketData, isInChat: $isInChat, chatData: $chatsData}),
    target: newChatMessageHandler,
})

updateLoadsHandler.watch(({data, maxMiles, selfStatus})=>{
    if (selfStatus === statuses.waiting) {
        data.data.forEach((load)=>{
            if (distanceValidate(load.start_location, 2000000000000000)) {
                addNewLoad({...load})
                // pushNotificationNewLoad(data)
            }
        })
    }
})

newChatMessageHandler.watch(({isAuth, isInChat, selfId, chatData, socketData})=>{
    if (socketData?.user_from.id !== selfId && isAuth) {
        const chat = chatData?.find((el) => el.id === socketData.chat_id)
        if (chat && !isInChat) {
            if (AppState.currentState === 'active') {
                pushNotification({
                    title: socketData.user_from.first_name,
                    text: socketData.content,
                    action: pushActions.newChatSms,
                    id: chat.id,
                })
            }
            setIsNewMessageInChat(true)
        }
        setUnreadCount({id: socketData.chat_id, content: socketData.content})
    }
    if (socketData.files?.length) {
        addNewChatMessage([socketData])
    }
})
