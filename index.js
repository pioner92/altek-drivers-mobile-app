import {AppRegistry} from 'react-native'

import App from './App'
import React from 'react'
import {FirebaseService} from './src/lib/firebase-serivce/firebase-service'
import {notificationHandler} from './src/lib/firebase-serivce/notification-handler'
import Instabug from 'instabug-reactnative'
Instabug.startWithToken('eda9a49f3e04002568ad6b740db82e75', [Instabug.invocationEvent.shake])


FirebaseService.backgroundMessageListener({handler: notificationHandler})


export function HeadlessCheck({isHeadless}) {
    if (isHeadless) {
        return null
    }
    return <App/>
}


AppRegistry.registerComponent('main', () => HeadlessCheck)


// registerRootComponent calls AppRegistry.registerComponent('available-home', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
// registerRootComponent(HeadlessCheck);
