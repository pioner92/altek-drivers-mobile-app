import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {BottomTabNavigationScreen} from '../../navigation/BottomTabNavigator'
import {HeaderBackButton} from '../../ui/atoms/buttons/header-back'
import {LoadInfo} from './load-info'
import {ChatContent, Filter, UnloadingVerification} from '../index'
import {UploadingVerificationStep1} from './uploading-veriffication/uploading-verification-step-1'
import {UploadingVerificationStep2} from './uploading-veriffication/uploading-verification-step-2'
import {UploadingVerificationStep3} from './uploading-veriffication/uploading-verification-step-3'
import {UploadingVerificationStep4} from './uploading-veriffication/uploading-verification-step-4'
import {CameraScreen} from './camera/camera-screen'
import {EditProfile} from './profile/screens/edit-profile/edit-profile'
import {StackScreenContainer} from '../stack-screen-container'
import {links} from '../../navigation/links'
import {CompletedLoads} from './profile/screens/completed-loads/completed-loads'
import {BidDetailForActiveLoads} from './bids/bid-detail/bid-detail-for-active-loads/bid-details-for-active-loads'
import {BidDetailScreen} from './bids/bid-detail/bid-detail-screen/bid-detail-screen'

const Stack = createStackNavigator()


export const MainStackScreen = () => {
    return (

        <StackScreenContainer>
            <Stack.Screen
                name={'MainScreen'}
                options={{cardStyle: {backgroundColor: '#fff'}}}
                component={BottomTabNavigationScreen}/>

            <Stack.Screen
                name={links.bidDetailForActiveLoads}
                component={BidDetailForActiveLoads}
                options={{
                    title: 'Load offer',
                    headerShown: true,
                    headerBackImage: HeaderBackButton,
                    headerBackTitleVisible: false,
                }}
            />
            <Stack.Screen
                name={links.bidDetail}
                component={BidDetailScreen}
                options={{
                    title: 'Profile',
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
                component={UploadingVerificationStep1}
            />
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerBackImage: HeaderBackButton,
                    title: 'Load info',
                    headerBackTitleVisible: false,
                }}
                name={links.loadingVerified2}
                component={UploadingVerificationStep2}
            />
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerBackImage: HeaderBackButton,
                    title: 'Load info',
                    headerBackTitleVisible: false,
                }}
                name={links.loadingVerified3}
                component={UploadingVerificationStep3}
            />
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerBackImage: HeaderBackButton,
                    title: 'Load info',
                    headerBackTitleVisible: false,
                }}
                name={links.loadingVerified4}
                component={UploadingVerificationStep4}
            />
            <Stack.Screen
                options={{
                    title: 'Unloading',
                    headerShown: true,
                    headerBackImage: HeaderBackButton,
                    headerBackTitleVisible: false,
                }}
                name={links.unloading}
                component={UnloadingVerification}
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
            <Stack.Screen
                name={links.completedLoads}
                component={CompletedLoads}
                options={{
                    headerShown: true,
                    headerTintColor: '#000',
                    title: 'Profile',
                    headerBackImage: HeaderBackButton,
                    headerBackTitleVisible: false,
                }}
            />
        </StackScreenContainer>
    )
}
