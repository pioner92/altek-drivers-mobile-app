import {Stack, StackScreenContainer} from '../../stack-screen-container'
import {UploadingVerificationStep1} from './uploading-verification-step-1'
import {HeaderBackButton} from '../../../src/ui/atoms/buttons/header-back'
import links from '../../../links.json'
import {UploadingVerificationStep2} from './uploading-verification-step-2'
import {UploadingVerificationStep3} from './uploading-verification-step-3'
import {UploadingVerificationStep4} from './uploading-verification-step-4'
import React from 'react'

export const UploadingVerificationStackScreen = () => {
    return (
        <StackScreenContainer>
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
        </StackScreenContainer>
    )
}
