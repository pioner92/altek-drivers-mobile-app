import {AppRegistry} from 'react-native';

import App from './App';
import React from 'react';
import {FirebaseService} from './utils/firebase-serivce/firebase-service';
import {notificationHandler} from './utils/firebase-serivce/notification-handler';


FirebaseService.backgroundMessageListener({handler: notificationHandler});
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//     console.log('Message handled in the background!', remoteMessage);
//     console.log("MESSAGE BACKGROUND")
//     // handler({message: remoteMessage})
// });

export function HeadlessCheck({isHeadless}) {
    if (isHeadless) {
        return null;
    }
    return <App/>;
}


AppRegistry.registerComponent('main', () => HeadlessCheck);


// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
// registerRootComponent(HeadlessCheck);
