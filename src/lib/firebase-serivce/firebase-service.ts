import messaging, {FirebaseMessagingTypes} from '@react-native-firebase/messaging'
import {notificationHandlerPropsType} from './notification-handler'
import {chatContentPropsType} from '../../screens/main-stack-screen/chat/chat-content/chat-content'


type backgroundMessageHandlerType = {
    handler: (props: notificationHandlerPropsType) => void
}

const chatNotificationValidate = (message: FirebaseMessagingTypes.RemoteMessage) => {
    return message?.data &&
        message.data.hasOwnProperty('action') &&
        message.data.action === 'chat_message' &&
        message.data.hasOwnProperty('id') &&
        message.data.id
}


export class FirebaseService {
    static unsubscribeCallback: () => void | undefined

    static requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission()
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL
        return enabled
    }


    static getToken = async () => {
        const isEnabled = await FirebaseService.requestUserPermission()
        if (isEnabled) {
            const fcmToken = await messaging().getToken()
            if (fcmToken) {
                // messaging().subscribeToTopic('all')
                return fcmToken
            } else {
                console.log('Failed', 'No token received')
            }
        }
    }


    static topicSubscribe = (topicName: string) => {
        messaging().subscribeToTopic(topicName)
    }

    static topicUnsubscribe = (topicName: string) => {
        messaging().unsubscribeFromTopic(topicName)
    }

    static foregroundMessageListener = ({handler}: backgroundMessageHandlerType) => {
        FirebaseService.unsubscribeCallback = messaging().onMessage(async (remoteMessage) => {
            handler({message: remoteMessage})
        })
    }

    static backgroundMessageListener = ({handler}: backgroundMessageHandlerType) => {
        messaging().setBackgroundMessageHandler(async (remoteMessage) => {
            handler({message: remoteMessage})
        })
    }


    static onOpenHandler = (callback: ({id}: chatContentPropsType) => void) => {
        messaging().onNotificationOpenedApp((message) => {
            if (chatNotificationValidate(message)) {
                const {id} = message.data!
                callback({id: +id})
            }
        })
        messaging().getInitialNotification()
            .then((message) => {
                if (message && chatNotificationValidate(message)) {
                    const {id} = message.data!
                    callback({id: +id})
                }
            })
    }

    static unsubscribeRemoteMessage = () => {
        messaging().unregisterDeviceForRemoteMessages()
        messaging().deleteToken()
    }

    static unsubscribe = () => {
        if (FirebaseService.unsubscribeCallback) {
            FirebaseService.unsubscribeCallback()
        }
    }
}
