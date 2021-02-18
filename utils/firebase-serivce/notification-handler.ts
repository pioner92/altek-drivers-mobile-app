import {FirebaseMessagingTypes} from "@react-native-firebase/messaging";
import {sendGeoToServer} from "../../src/api/rest/send-geo-to-server";
import {pushNotification} from "../notification/push-notification";
import {AppState} from "react-native";

export type notificationHandlerPropsType = {
    message: FirebaseMessagingTypes.RemoteMessage
}

enum ActionsEnum {
    updateLocation = "update_location",
    chatMessage = "chat_message"

}


const AppBackgroundStatus = () => {
    return AppState.currentState === "background"
}

export const notificationHandler =  ({message}: notificationHandlerPropsType) => {

    if (message.data?.hasOwnProperty("action")) {
        switch (message.data?.action) {
            case ActionsEnum.updateLocation:
                sendGeoToServer()
                break;

            case ActionsEnum.chatMessage :
                if (AppBackgroundStatus()) {
                    // pushNotification({
                    //     text: message.data.body,
                    //     title: message.data.title,
                    //     id: +message.data.id,
                    //     action: 'newChatSms'
                    // });
                    break;
                }
        }
    }
}