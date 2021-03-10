import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'

const newChatSms = 'newChatSms'

export enum pushActions {
    newChatSms='newChatSms',
    newLoad = 'newLoad'
}


export type actionsType = keyof typeof pushActions

type handlerType = {
    action: actionsType
    callback:({id}:{id:number})=>void
}

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
    action?: actionsType
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

// export const NotificationsHandler = async (callback: ({id}: chatContentPropsType) => void) => {
//     Notifications.addNotificationResponseReceivedListener((notification) => {
//         const data = notification.notification.request.content.data as propsType
//         if (data?.hasOwnProperty('action') && data.action === newChatSms) {
//             const {id = 0} = data || {}
//             callback({id})
//         }
//     })
// }


export const NotificationsHandler = async (handlers:Array<handlerType>) => {
    Notifications.addNotificationResponseReceivedListener((notification) => {
        const data = notification.notification.request.content.data as propsType

        if (data?.hasOwnProperty('action')) {
            const {id = 0} = data || {}

            handlers.forEach((handler)=>{
                if (data.action === handler.action) {
                    handler.callback({id})
                }
            })
        }
    })
}

export const pushNotification = async ({title, text, action = pushActions.newLoad, id}: propsType) => {
    type dataType = {
        action?: string
        id?: number
        loadId?: number
        avatar?: string
        membersCount?: number
    }

    const data: dataType = {
        action,
        id,
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
