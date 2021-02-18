import React, {useEffect, useLayoutEffect} from 'react';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import {DarkTheme, DefaultTheme, NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack';
import {Alert, AppRegistry, StatusBar, Text, TextInput} from "react-native";
import {Chat, ChatContent, Filter, LoadInfo, Login, Profile, UnloadingVerified, Verification} from "./screens";
import {getIsAuth} from "./utils/get-is-auth";
import {useStore} from "effector-react";
import {$isAuth, setIsAuth} from "./Store/Store";
import {
    UploadingVerifiedStep1,
    UploadingVerifiedStep2,
    UploadingVerifiedStep3,
    UploadingVerifiedStep4
} from "./screens/uploading-verified";
import links from './links.json'
import {setIsAvailable} from "./src/features/set-available/models";
import {getDb} from "./utils/db/get-db";
import {SignUp} from "./screens/sign-up/sign-up";
import {Bids} from "./screens/bids/bids";
import {BackButton} from "./src/features/header-back-button/header-back-button";
import {FilterButton} from "./src/features/filter-button/filter-button";
import {getUserData} from "./src/api/rest/get-user-data";
import {Home} from "./screens/home";
import {BidDetail} from "./screens/bid-detail/bid-detail";
import {EditProfile} from "./screens/profile/screens/edit-profile/edit-profile";
import {CameraScreen} from "./screens/camera/camera-screen";
import {MyCards} from "./screens/profile/screens/my-card/my-cards";
import {ISAVAILABLE} from "./utils/db/constants";
import {EditCardData} from "./screens/profile/screens/edit-card-data/edit-card-data";
import {
    getNotificationPermissions,
} from './utils/notification/push-notification';
import {useAppState} from "./hooks/useAppState";
import {FirebaseService} from "./utils/firebase-serivce/firebase-service";
import {useSendGeo} from "./hooks/use-send-geo";
import {getLocationPermissions} from "./utils/permissions/location-permissions";

const Stack = createStackNavigator();


export default function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();
    const isAuth = useStore($isAuth)

//@ts-ignore
    if (Text.defaultProps == null) Text.defaultProps = {};
//@ts-ignore
    Text.defaultProps.allowFontScaling = false;
    //@ts-ignore
    TextInput.defaultProps.allowFontScaling = false


    useLayoutEffect(() => {
        getNotificationPermissions()
        getLocationPermissions()

        getDb(ISAVAILABLE)
            .then(data => {
                setIsAvailable(data === 'true' ? true : false)
            })

        getIsAuth()
            .then(result => {
                setIsAuth(result)
                if (result) {
                    getUserData()
                }
            })
    }, [])

    useEffect(() => {
        return FirebaseService.unsubscribe
    }, [])

    useAppState()

    // useSendGeo()


    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <>
                <NavigationContainer
                    theme={colorScheme == 'dark' ? DarkTheme : DefaultTheme}>
                    <Stack.Navigator
                        initialRouteName={links.home}
                        screenOptions={{
                            headerTintColor: '#000',
                            headerStyle: {
                                shadowColor: '#E1E1E1',
                                backgroundColor: '#ffffff',
                            }
                        }}>
                        {!isAuth && <Stack.Screen name={links.login}
                                                  options={{
                                                      headerShown: false
                                                  }}
                                                  component={Login}/>}
                        {!isAuth && <Stack.Screen name={links.verification}
                                                  options={{
                                                      headerShown: false
                                                  }}
                                                  component={Verification}/>}
                        {!isAuth && <Stack.Screen
                            options={{
                                headerShown: false
                            }}
                            name={links.singUp}
                            component={SignUp}/>}

                        <Stack.Screen
                            options={{
                                headerShown: false
                            }}
                            name={links.home}
                            component={Home}
                        />

                        <Stack.Screen
                            options={{title: 'Load info', headerBackTitleVisible: false}}
                            name={links.loadingVerified1}
                            component={UploadingVerifiedStep1}
                        />
                        <Stack.Screen
                            options={{title: 'Load info', headerBackTitleVisible: false}}
                            name={links.loadingVerified2}
                            component={UploadingVerifiedStep2}
                        />
                        <Stack.Screen
                            options={{title: 'Load info', headerBackTitleVisible: false}}
                            name={links.loadingVerified3}
                            component={UploadingVerifiedStep3}
                        />
                        <Stack.Screen
                            options={{title: 'Load info', headerBackTitleVisible: false}}
                            name={links.loadingVerified4}
                            component={UploadingVerifiedStep4}
                        />
                        <Stack.Screen
                            options={{title: 'Unloading', headerBackTitleVisible: false}}
                            name={links.unloading}
                            component={UnloadingVerified}
                        />

                        <Stack.Screen
                            name={links.bids}
                            component={Bids}
                            options={{
                                headerLeft: (props) => (<BackButton/>),
                                headerRight: (props) => (<FilterButton/>),
                                title: 'Bids'
                            }}
                        />
                        <Stack.Screen
                            name={links.loadInfo}
                            options={{
                                title: 'Load info',
                                headerLeft: (props) => (<BackButton/>),
                            }}
                            component={LoadInfo}/>

                        <Stack.Screen
                            name={links.bidDetail}
                            options={{
                                title: 'Load info',
                                headerLeft: (props) => (<BackButton backTo={links.bids}/>),
                            }}
                            component={BidDetail}/>

                        <Stack.Screen
                            name={links.filter}
                            options={{
                                headerLeft: (props) => (<BackButton backTo={links.bids}/>),
                            }}
                            component={Filter}/>
                        <Stack.Screen
                            name={links.chat}
                            options={{
                                title: 'Chats',
                                headerLeft: (props) => (<BackButton/>),
                            }}
                            component={Chat}/>
                        <Stack.Screen
                            name={links.chatContent}
                            options={{
                                headerLeft: (props) => (<BackButton backTo={links.chat}/>),
                            }}
                            component={ChatContent}/>
                        <Stack.Screen
                            name={links.profile}
                            options={{
                                headerLeft: (props) => (<BackButton/>),
                            }}
                            component={Profile}/>

                        <Stack.Screen
                            name={links.editProfile}
                            options={{
                                title: 'Edit Profile',
                                headerLeft: (props) => (<BackButton backTo={links.profile}/>),
                            }}
                            component={EditProfile}/>

                        <Stack.Screen
                            name={links.camera}
                            options={{
                                title: 'Camera',
                            }}
                            component={CameraScreen}/>
                        <Stack.Screen
                            name={links.myCards}
                            options={{
                                title: 'My Card',
                                headerLeft: (props) => (<BackButton backTo={links.profile}/>),
                            }}
                            component={MyCards}/>
                        <Stack.Screen
                            name={links.editCardData}
                            options={{
                                title: 'Card Data',
                                headerLeft: (props) => (<BackButton backTo={links.myCards}/>),
                            }}
                            component={EditCardData}/>

                    </Stack.Navigator>
                    <StatusBar barStyle="dark-content" backgroundColor={"#fff"}/>
                </NavigationContainer>
            </>
        );
    }
}
