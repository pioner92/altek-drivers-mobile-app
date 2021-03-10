import React from 'react'
import {Keyboard, StyleSheet, View} from 'react-native'
import {AuthTitle} from '../../../ui/atoms/title'
import {Input} from '../../../ui/atoms/input'
import {Wrapper} from '../../../ui/atoms/wrapper'
import {useNavigation} from '@react-navigation/native'
import {WhiteCard} from '../../../ui/atoms/card/white-card'
import {SignUpOrLogInSubtitle} from '../../../features/sign-up-or-login-subtitles/sign-up-or-login-subtites'
import links from '../../../../links.json'
import {ButtonWithSubtitles} from '../../../ui/atoms/buttons/button-with-subtitles'
import {
    $inputValueSignUpName,
    $inputValueSignUpNumber,
    setInputValueSignUpName,
    setInputValueSignUpNumber,
} from './models/models'
import {useStore} from 'effector-react'
import {ScreenWrapper} from '../../../ui/atoms/screen-wrapper/screen-wrapper'
import {styleConfig} from '../../../StyleConfig'

export const SignUp: React.FC = () => {
    const nameInputValue = useStore($inputValueSignUpName)
    const numberInputValue = useStore($inputValueSignUpNumber)

    const closeKeyboard = () => {
        Keyboard.dismiss()
    }
    const {navigate} = useNavigation()


    const onChangeName = (text: string) => {
        setInputValueSignUpName(text)
    }
    const onChangeNumber = (text: string) => {
        setInputValueSignUpNumber(text)
    }

    const singUp = () => {

    }

    return (
        <ScreenWrapper safeAreaStyle={{backgroundColor: styleConfig.screenBackground}}>
            <AuthTitle>Sign Up</AuthTitle>
            <View style={{paddingHorizontal: 19, marginBottom: 38}}>
                <WhiteCard>
                    <Input value={nameInputValue} onChange={onChangeName} placeholder='Your name'/>
                    <Input value={numberInputValue} onChange={onChangeNumber} placeholder='Your phone number'/>
                </WhiteCard>
            </View>
            <Wrapper>
                <ButtonWithSubtitles onPress={singUp} buttonTitle={'Sign Up'}>
                    <SignUpOrLogInSubtitle link={links.login} title='Already have an account?' buttonTitle='Log In'/>
                </ButtonWithSubtitles>
            </Wrapper>
        </ScreenWrapper>
    )
}

const styles = StyleSheet.create({
    container: {},
})
