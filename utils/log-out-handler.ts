import {resetUserDataInLocalDB} from './reset-profile-data'
import {resetIsAuth} from '../Store/Store'
import {hideArrivedMenu} from '../src/features/arrived-menu/models'
import {resetUserDataStore} from '../screens/main-stack-screen/profile/models/models'
import {resetIsAvailable, resetSetIsAvailableAnimValue} from '../src/features/set-available/models/models'
import {
    resetArrivedMenuAnimValue,
    resetIsMountedArrivedAnimValue,
    resetIsOpenedArrivedMenu,
} from '../src/features/arrived-menu/models/models'
import {resetCurrentLoad} from '../screens/main-stack-screen/load-info/models/models'
import {resetSelfStatus} from '../hooks/delivery-hooks'
import {resetChatsData} from '../screens/main-stack-screen/chat/models/models'
import {FirebaseService} from './firebase-serivce/firebase-service'
import {resetIndexNavButton} from '../src/features/navigation/models/models'
import {updateProfileDateOnServer} from '../src/api/rest/update-profile'

export const logOutHandler = async () => {
    console.log('LOGOUT')
    FirebaseService.unsubscribe()
    FirebaseService.unsubscribeRemoteMessage()
    resetUserDataInLocalDB()
    updateProfileDateOnServer({fb_token: '0'})
    resetIndexNavButton()
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
