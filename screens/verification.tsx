import React, {useCallback, useEffect, useState} from 'react'
import {setIsAuth} from '../Store/Store'
import {StyleSheet, Text, View} from 'react-native'
import {AuthTitle} from '../src/ui/atoms/title'
import {Counter} from '../src/features/counter'
import {NumberFields} from '../src/features/number-fields'
import {Wrapper} from '../src/ui/atoms/wrapper'
import {auth} from '../src/api/rest/auth/auth'
import {login} from '../src/api/rest/auth/login'
import {ButtonWithSubtitles} from '../src/ui/atoms/buttons/button-with-subtitles'
import {ScreenWrapper} from '../src/ui/atoms/screen-wrapper/screen-wrapper'
import {getUserData} from '../src/api/rest/get-user-data'
import {setSelfStatus, statuses} from '../hooks'
import {styleConfig} from '../src/StyleConfig'
import {sendLogOutPush} from '../src/api/rest/send-log-out-push'


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
            sendLogOutPush()
        }
    }, [value])

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
