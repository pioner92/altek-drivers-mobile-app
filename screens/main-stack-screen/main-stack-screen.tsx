import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {BottomTabNavigationScreen} from '../../navigation/BottomTabNavigator'
import links from '../../links.json'
import {BidDetail} from './bid-detail/bid-detail'
import {HeaderBackButton} from '../../src/ui/atoms/buttons/header-back'
import {LoadInfo} from './load-info'
import {ChatContent, Filter, UnloadingVerified} from '..'
import {UploadingVerifiedStep1} from './uploading-verified/uploading-verified-step-1'
import {UploadingVerifiedStep2} from './uploading-verified/uploading-verified-step-2'
import {UploadingVerifiedStep3} from './uploading-verified/uploading-verified-step-3'
import {UploadingVerifiedStep4} from './uploading-verified/uploading-verified-step-4'
import {CameraScreen} from './camera/camera-screen'
import {EditProfile} from './profile/screens/edit-profile/edit-profile'
import {StackScreenContainer} from '../stack-screen-container'

const Stack = createStackNavigator()


export const MainStackScreen = () => {
    return (

        <StackScreenContainer>
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
        </StackScreenContainer>
    )
}
