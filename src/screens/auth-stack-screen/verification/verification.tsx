import React, {useCallback, useEffect, useState} from 'react'
import {setIsAuth} from '../../../../Store/Store'
import {StyleSheet, Text, View} from 'react-native'
import {AuthTitle} from '../../../ui/atoms/title'
import {Counter} from '../../../features/counter'
import {NumberFields} from '../../../features/number-fields'
import {Wrapper} from '../../../ui/atoms/wrapper'
import {auth} from '../../../api/rest/auth/auth'
import {login} from '../../../api/rest/auth/login'
import {ButtonWithSubtitles} from '../../../ui/atoms/buttons/button-with-subtitles'
import {ScreenWrapper} from '../../../ui/atoms/screen-wrapper/screen-wrapper'
import {getUserData} from '../../../api/rest/get-user-data'
import {setSelfStatus, statuses} from '../../../../hooks'
import {styleConfig} from '../../../StyleConfig'
import {useSmsListener} from './lib/use-sms-listener/use-sms-listener'

export const Verification = () => {
    const [value, setValue] = useState('')
    const [counter, setCounter] = useState(180)


    const onPressVerify = useCallback(async () => {
        const result = await auth(value)
        const {email = '', password = '', success} = result || {}
        if (success) {
            await login({email, password})
            await getUserData()
            setIsAuth(true)
            setSelfStatus(statuses.waiting)
        }
    }, [value])


    useSmsListener({callback: setValue})

    useEffect(() => {
        const tick = setInterval(() => {
            setCounter(((prevState) => prevState - 1))
        }, 1000)

        return () => {
            clearInterval(tick)
            setCounter(180)
        }
    }, [])


    return (
        <ScreenWrapper safeAreaStyle={{backgroundColor: styleConfig.screenBackground}}>
            <View style={styles.titleWrapper}>
                <AuthTitle>
                    Verify Your Number
                </AuthTitle>
            </View>
            <NumberFields
                value={value}
                setValue={setValue}
            />
            <Wrapper style={{marginTop: 56}}>
                <ButtonWithSubtitles onPress={onPressVerify} buttonTitle='Verify'>
                    <View style={styles.counterWrapper}>
                        <Text style={styles.counterText}>Resend conformation code
                            <Counter
                                value={counter}
                                style={styles.counterText}/>
                        </Text>
                    </View>
                </ButtonWithSubtitles>
            </Wrapper>
        </ScreenWrapper>
    )
}


const styles = StyleSheet.create({
    titleWrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    counterWrapper: {
        width: '100%',
        alignItems: 'center',
        marginTop: 11,
    },
    counterText: {
        fontSize: 12,
        fontFamily: 'IBMPlex-500',
        color: '#1067C5',
    },
    svgWrapper: {
        flex: 1,
        alignItems: 'center',
    },
})
