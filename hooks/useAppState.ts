import {useEffect} from "react";
import {AppState, Platform} from "react-native";
import {pushNotification, resetBadgeCount} from "../utils/notification/push-notification";

export const useAppState = () => {
    useEffect(()=>{
        AppState.addEventListener('change' ,handleAppStateChange)
        return ()=> {
            AppState.removeEventListener('change', handleAppStateChange)
        }
    },[])
}

const handleAppStateChange = (nextAppState:string) => {

    if(Platform.OS === "ios") {


        if (nextAppState === 'background') {
            // pushNotification({title:'Please, open the app to keep sending your location.',text:'Thank you!'})
        }
        else if(nextAppState === "active"){
            resetBadgeCount()
        }
    }


}