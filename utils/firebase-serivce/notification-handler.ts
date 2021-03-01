import {FirebaseMessagingTypes} from '@react-native-firebase/messaging'
import {sendGeoToServer} from '../../src/api/rest/send-geo-to-server'
import {AppState} from 'react-native'
import {logOutHandler} from '../log-out-handler'

export type notificationHandlerPropsType = {
    message: FirebaseMessagingTypes.RemoteMessage
}

enum ActionsEnum {
    updateLocation = 'update_location',
    chatMessage = 'chat_message',
    logout = 'logout'
}


const appBackgroundStatus = () => {
    return AppState.currentState === 'background'
}

export const notificationHandler = ({message}: notificationHandlerPropsType) => {
    if (message.data?.hasOwnProperty('action')) {
        switch (message.data?.action) {
        case ActionsEnum.updateLocation:
            sendGeoToServer()
            break
        case ActionsEnum.logout:
            if (appBackgroundStatus()) {
                logOutHandler()
            }
            break
        }
    }
}
