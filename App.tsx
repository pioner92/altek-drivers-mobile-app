import React, {useEffect} from 'react'
import useCachedResources from './hooks/useCachedResources'
import useColorScheme from './hooks/useColorScheme'
import {DarkTheme, DefaultTheme, NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {StatusBar, Text, TextInput} from 'react-native'
import {ChatContent, Filter, LoadInfo, Login, UnloadingVerified, Verification} from './screens'
import {useStore} from 'effector-react'
import {$isAuth} from './Store/Store'
import {
    UploadingVerifiedStep1,
    UploadingVerifiedStep2,
    UploadingVerifiedStep3,
    UploadingVerifiedStep4,
} from './screens/uploading-verified'
import links from './links.json'
import {SignUp} from './screens/sign-up/sign-up'
import {BidDetail} from './screens/bid-detail/bid-detail'
import {EditProfile} from './screens/profile/screens/edit-profile/edit-profile'
import {CameraScreen} from './screens/camera/camera-screen'
import {getNotificationPermissions} from './utils/notification/push-notification'
import {useAppState} from './hooks/useAppState'
import {FirebaseService} from './utils/firebase-serivce/firebase-service'
import {getLocationPermissions} from './utils/permissions/location-permissions'
import {BottomTabNavigationScreen} from './navigation/BottomTabNavigator'
import {HeaderBackButton} from './src/ui/atoms/buttons/header-back'
import {SafeAreaProvider} from 'react-native-safe-area-context'


const Stack = createStackNavigator()


export default function App() {
    const isLoadingComplete = useCachedResources()
    const colorScheme = useColorScheme()
    const isAuth = useStore($isAuth)

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


    useAppState()

    if (!isLoadingComplete) {
        return null
    } else {
        return (
            <>
                <SafeAreaProvider>
                    <NavigationContainer
                        theme={colorScheme == 'dark' ? DarkTheme : DefaultTheme}>
                        <Stack.Navigator
                            initialRouteName={isAuth ? links.home : links.login}
                            screenOptions={{
                                headerTintColor: '#000',
                                headerShown: false,
                                headerStyle: {
                                    backgroundColor: '#fff',
                                    borderColor: 'transparent',
                                    shadowColor: '#000',
                                    shadowOffset: {
                                        width: 0,
                                        height: 1,
                                    },
                                    shadowOpacity: 0.10,
                                    shadowRadius: 1.41,
                                    elevation: 2,
                                },
                            }}>
                            {!isAuth ?
                                <>
                                    <Stack.Screen name={links.login} component={Login}/>
                                    <Stack.Screen name={links.verification} component={Verification}/>
                                    <Stack.Screen name={links.singUp} component={SignUp}/>
                                </> :
                                <>
                                    <Stack.Screen
                                        name={'MainScreen'}
                                        options={{cardStyle: {backgroundColor: '#fff'}}}
                                        component={BottomTabNavigationScreen}/>

                                    <Stack.Screen
                                        name={links.bidDetail}
                                        component={BidDetail}
                                        options={{
                                            title: 'Load offer',
                                            headerShown: true,
                                            headerBackImage: HeaderBackButton,
                                            headerBackTitleVisible: false,
                                        }}
                                    />
                                    <Stack.Screen
                                        name={links.loadInfo}
                                        component={LoadInfo}
                                        options={{
                                            title: 'Load info',
                                            headerShown: true,
                                            headerBackImage: HeaderBackButton,
                                            headerBackTitleVisible: false,
                                        }}
                                    />
                                    <Stack.Screen
                                        name={links.chatContent}
                                        component={ChatContent}
                                        options={{
                                            headerShown: true,
                                            headerBackImage: HeaderBackButton,
                                            headerBackTitleVisible: false,
                                        }}
                                    />
                                    <Stack.Screen
                                        name={links.filter}
                                        component={Filter}
                                        options={{
                                            title: 'Filters',
                                            headerShown: true,
                                            headerBackImage: HeaderBackButton,
                                            headerBackTitleVisible: false,
                                        }}
                                    />
                                    <Stack.Screen
                                        options={{
                                            headerShown: true,
                                            headerBackImage: HeaderBackButton,
                                            title: 'Load info',
                                            headerBackTitleVisible: false,
                                        }}
                                        name={links.loadingVerified1}
                                        component={UploadingVerifiedStep1}
                                    />
                                    <Stack.Screen
                                        options={{
                                            headerShown: true,
                                            headerBackImage: HeaderBackButton,
                                            title: 'Load info',
                                            headerBackTitleVisible: false,
                                        }}
                                        name={links.loadingVerified2}
                                        component={UploadingVerifiedStep2}
                                    />
                                    <Stack.Screen
                                        options={{
                                            headerShown: true,
                                            headerBackImage: HeaderBackButton,
                                            title: 'Load info',
                                            headerBackTitleVisible: false,
                                        }}
                                        name={links.loadingVerified3}
                                        component={UploadingVerifiedStep3}
                                    />
                                    <Stack.Screen
                                        options={{
                                            headerShown: true,
                                            headerBackImage: HeaderBackButton,
                                            title: 'Load info',
                                            headerBackTitleVisible: false,
                                        }}
                                        name={links.loadingVerified4}
                                        component={UploadingVerifiedStep4}
                                    />
                                    <Stack.Screen
                                        options={{
                                            title: 'Unloading',
                                            headerShown: true,
                                            headerBackImage: HeaderBackButton,
                                            headerBackTitleVisible: false,
                                        }}
                                        name={links.unloading}
                                        component={UnloadingVerified}
                                    />
                                    <Stack.Screen
                                        name={links.camera}
                                        options={{
                                            title: 'Camera',
                                        }}
                                        component={CameraScreen}/>
                                    <Stack.Screen
                                        name={links.editProfile}
                                        component={EditProfile}
                                        options={{
                                            headerShown: true,
                                            headerTintColor: '#000',
                                            title: 'Edit Profile',
                                            headerBackImage: HeaderBackButton,
                                            headerBackTitleVisible: false,
                                        }}
                                    />
                                </>
                            }
                        </Stack.Navigator>
                        <StatusBar barStyle="dark-content" backgroundColor={'#fff'}/>
                    </NavigationContainer>
                </SafeAreaProvider>
            </>
        )
    }
}


