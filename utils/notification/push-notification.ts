import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'
import {chatContentPropsType} from '../../screens/main-stack-screen/chat/chat-content/chat-content'

const newChatSms = 'newChatSms'

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
})


type propsType = {
    title: string
    text: string
    action?: string
    id?: number
}

// export const getGeolocationPermissions = async () => {
//     const {status} = await Permissions.getAsync(Permissions.LOCATION)
//     if (status !== 'granted') {
//         const {status} = await Permissions.askAsync(Permissions.LOCATION)
//         return status
//     }
//     return status
// }


export const resetBadgeCount = () => {
    Notifications.setBadgeCountAsync(0)
}

export const getNotificationPermissions = async () => {
    const {status} = await Permissions.getAsync(Permissions.NOTIFICATIONS)
    if (status) {
        const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS)
    }
}

export const NotificationsHandler = async (callback: ({id}: chatContentPropsType) => void) => {
    Notifications.addNotificationResponseReceivedListener((notification) => {
        const data = notification.notification.request.content.data as propsType
        if (data?.hasOwnProperty('action') && data.action === newChatSms) {
            const {id = 0} = data || {}
            callback({id})
        }
    })
}
export const pushNotification = async ({title, text, action = 'newLoad', id}: propsType) => {
    type dataType = {
        action: string
        id?: number
        loadId?: number
        avatar?: string
        membersCount?: number
    }

    const data: dataType = {
        action,
    }
    if (action === newChatSms) {
        data['id'] = id
    }

    const badgeCount = await Notifications.getBadgeCountAsync()

    await Notifications.scheduleNotificationAsync({
        content: {
            title: title,
            body: text,
            sound: 'default',
            data: data,
            badge: action === newChatSms ? badgeCount + 1 : badgeCount,
        },
        trigger: {seconds: 2},
    })
}
