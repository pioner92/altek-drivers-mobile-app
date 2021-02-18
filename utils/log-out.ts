import {resetUserData} from "./reset-profile-data";
import {resetIsAuth} from "../Store/Store";
import {hideArrivedMenu, } from "../src/features/arrived-menu/models";
import {resetUserDataStore} from "../screens/profile/models/models";
import {resetIsAvailable, resetSetIsAvailableAnimValue} from "../src/features/set-available/models/models";
import {
    resetArrivedMenuAnimValue,
    resetIsMountedArrivedAnimValue,
    resetIsOpenedArrivedMenu
} from "../src/features/arrived-menu/models/models";
import {resetCurrentLoad} from "../screens/load-info/models/models";
import {resetSelfStatus} from "../hooks/delivery-hooks";
import {resetChatsData} from "../screens/chat/models/models";
import {FirebaseService} from "./firebase-serivce/firebase-service";

export const logOut = async () => {
    FirebaseService.unsubscribeRemoteMessage()
    await resetUserData()
    hideArrivedMenu()
    resetCurrentLoad()
    resetUserDataStore()
    resetIsAuth()
    resetIsAvailable()
    resetSetIsAvailableAnimValue()
    resetIsMountedArrivedAnimValue()
    resetArrivedMenuAnimValue()
    resetIsOpenedArrivedMenu()
    resetSelfStatus()
    resetChatsData()
}
