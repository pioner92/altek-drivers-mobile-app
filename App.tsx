import React, {useEffect} from 'react'
import useCachedResources from './hooks/useCachedResources'
import useColorScheme from './hooks/useColorScheme'
import {DarkTheme, DefaultTheme, NavigationContainer} from '@react-navigation/native'
import {StatusBar, Text, TextInput} from 'react-native'
import {useStore} from 'effector-react'
import {$isAuth} from './Store/Store'
import {getNotificationPermissions} from './src/lib/notification/push-notification'
import {useAppState} from './src/lib/hooks/useAppState'
import {FirebaseService} from './src/lib/firebase-serivce/firebase-service'
import {getLocationPermissions} from './src/lib/permissions/location-permissions'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {MainStackScreen} from './src/screens/main-stack-screen/main-stack-screen'
import {AuthStackScreen} from './src/screens/auth-stack-screen/auth-stack-screen'
import {useIsInBid} from './src/lib/hooks/use-is-in-bid'
import {$currentLoad} from "./src/screens/main-stack-screen/load-info/models";


if (__DEV__) {
    // @ts-ignore
    import('./Reacton.js').then(() => console.log('Reactotron Configured'))
}

export default function App() {
    const isLoadingComplete = useCachedResources()
    const colorScheme = useColorScheme()
    const isAuth = useStore($isAuth)
    const currentLoad = useStore($currentLoad)

    // @ts-ignore
    if (Text.defaultProps == null) Text.defaultProps = {}
    // @ts-ignore
    Text.defaultProps.allowFontScaling = false
    // @ts-ignore
    TextInput.defaultProps.allowFontScaling = false


    useEffect(() => {
        (async function f() {
            await getLocationPermissions()
            await getNotificationPermissions()
        })()
        return FirebaseService.unsubscribe
    }, [])


    useIsInBid(currentLoad)
    useAppState()


    if (!isLoadingComplete) {
        return null
    } else {
        return (
            <>
                <SafeAreaProvider>
                    <NavigationContainer
                        theme={colorScheme == 'dark' ? DarkTheme : DefaultTheme}>
                        {!isAuth
                            ? <AuthStackScreen/>
                            : <MainStackScreen/>
                        }
                        <StatusBar barStyle="dark-content" backgroundColor={'#fff'}/>
                    </NavigationContainer>
                </SafeAreaProvider>
            </>
        )
    }
}


