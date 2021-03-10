import {createEvent, createStore} from 'effector'
import {NewConnectService, newLoadHandler} from './lib'
import {loadType} from '../rest/loads/get-loads'
import {getDb} from '../../../utils/db/get-db'
import {logOutHandler} from '../../../utils/log-out-handler'
import {COMPANYHASH, TIMERBID, TOKEN} from '../../../utils/db/constants'
import {messageType} from '../rest/chat/get-chat-data'
import {
    $chatsData,
    $isAmInChat,
    $selfId,
    addNewChatMessage,
    setIsNewMessageInChat,
    setUnreadCount,
} from '../../screens/main-stack-screen/chat/models/models'
import {startTimer} from '../../features/button-with-counter/models/models'
import {setDb} from '../../../utils/db'
import {pushActions, pushNotification} from '../../../utils/notification/push-notification'
import {pushNotificationNewLoad} from './lib/push-notification-new-load'
import {$isAuth} from '../../../Store/Store'
import {AppState} from 'react-native'
import {urls} from '../urls'
import {$selfStatus, statuses} from '../../../hooks'
import {checkStatusesWithInit} from '../../../utils/check-statuses-with-init/check-statuses-with-init'


// Types
type newLoadOfferResponseType = {
    action: 'new_load_offer'
    data: loadType
}

type statusesResponseType = {
    action: 'load_status_change',
    data: {
        status: number
        substatus: string
    }
}
type statusDriverConnect = {
    action: 'driver_connect'
}

type chatMessageType = {
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
    }]
}

type driverBidType = {
    action: 'driver_bid'
    data: {
        load_id: string
        phone_number: string
    }
}


type socketDataType =
    newLoadOfferResponseType
    | statusesResponseType
    | statusDriverConnect
    | chatMessageType
    | driverBidType
    | updateLoadsType

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

export const closeSocket = createEvent()
export const socketSend = createEvent<object>()


// Stores
export const $socketStore = createStore<WebSocket | null>(null)
    .on(initSocket, (state, payload) => new WebSocket(urls.socketUrl(payload.companyHash, payload.token)))
    .on(closeSocket, (state) => {state?.close()})
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
        console.log('Close...')
        console.log(status)
        reconnectSocket()
    })
    state?.addEventListener('error', (error) => {
        console.log('Error...')
        console.log(error)
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
            if ($selfStatus.getState() === statuses.waiting) {
                pushNotificationNewLoad(data)
            }
            break
        case 'load_status_change':
            checkStatusesWithInit(data.data.status, +data.data.substatus)
            break
        case 'driver_connect':
            if (!NewConnectService.get()) {
                logOutHandler()
                    .then(() => closeSocket())
            }
            break
        case 'group_chat_message':
            if (!$isAmInChat.getState() && data?.data?.user_from.id !== $selfId.getState() && $isAuth.getState()) {
                const chat = $chatsData?.getState()?.find((el) => el.id === data.data.chat_id)
                if (chat) {
                    if (AppState.currentState === 'active') {
                        pushNotification({
                            title: data.data.user_from.first_name,
                            text: data.data.content,
                            action: pushActions.newChatSms,
                            id: chat.id,
                        })
                    }
                }
                setIsNewMessageInChat(true)
                setUnreadCount({id: data.data.chat_id, content: data.data.content})
            }

            addNewChatMessage([{...data.data}])
            break
        case 'driver_bid':
            setDb(TIMERBID, Date.now().toString())
            startTimer()
        }
    })
})


