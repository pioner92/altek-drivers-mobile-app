import React, {useCallback, useEffect} from 'react'
import {StyleSheet, View} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {AuthTitle} from '../../../src/ui/atoms/title'
import {Wrapper} from '../../../src/ui/atoms'
import {sendNumber} from '../../../src/api/rest/auth/send-number'
import {setIsAvailable} from '../../../src/features/set-available/models'
import links from '../../../links.json'
import {ButtonWithSubtitles} from '../../../src/ui/atoms/buttons/button-with-subtitles'
import {SignUpOrLogInSubtitle} from '../../../src/features/sign-up-or-login-subtitles/sign-up-or-login-subtites'
import {ScreenWrapper} from '../../../src/ui/atoms/screen-wrapper/screen-wrapper'
import {NumberInput} from './features/number-input'
import {useStore} from 'effector-react'
import {$inputValuePhoneNumber} from './features/models/models'
import {NumberErrorModal} from './features/number-error-modal/number-error-modal'
import {styleConfig} from '../../../src/StyleConfig'


export const Login = () => {
    const {navigate} = useNavigation()
    const inputValue = useStore($inputValuePhoneNumber)


    const logIn = useCallback(async () => {
        if (inputValue) {
            const result = await sendNumber(inputValue)
            const {success} = result || {}
            success && navigate(links.verification)
        }
    }, [inputValue])

    useEffect(() => {
        setIsAvailable(false)
    }, [])

    return (
        <ScreenWrapper safeAreaStyle={{backgroundColor: styleConfig.screenBackground}}>
            <NumberErrorModal/>
            <AuthTitle>Log in</AuthTitle>
            <View style={{paddingHorizontal: 19, marginBottom: 38}}>
                <NumberInput/>
            </View>
            <Wrapper>
                <ButtonWithSubtitles onPress={logIn} buttonTitle={'Log In'}>
                    <SignUpOrLogInSubtitle
                        link={links.singUp}
                        title='Don’t have an account?'
                        buttonTitle='Sign Up'/>
                </ButtonWithSubtitles>
            </Wrapper>
        </ScreenWrapper>
    )
}


const styles = StyleSheet.create({
    container: {},
    btnWrapper: {
        marginTop: 32,
    },
})

