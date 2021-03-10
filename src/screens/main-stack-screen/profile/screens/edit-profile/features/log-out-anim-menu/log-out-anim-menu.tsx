import React from 'react'
import {Animated, StyleSheet, Text} from 'react-native'
import {Button} from '../../../../../../../src/ui/atoms/buttons'
import {useStore} from 'effector-react'
import {$animValueLogOutAnimMenu, $isMountedLogOutAnimMenu, hideLogOutAnimMenu} from './models/models'
import {useInterpolate} from '../../../../../../../utils/animation-hooks/Hooks'
import {styleConfig} from '../../../../../../../src/StyleConfig'
import {logOutHandler} from '../../../../../../../utils/log-out-handler'


export const LogOutAnimMenu: React.FC = () => {
    const animValue = useStore($animValueLogOutAnimMenu)
    const isMounted = useStore($isMountedLogOutAnimMenu)

    const interpolateY = useInterpolate(animValue, [0, 1], [200, 0])

    const onPressLogOut = async () => {
        // FirebaseService.unsubscribe()
        // FirebaseService.unsubscribeRemoteMessage()
        // await resetUserData()
        logOutHandler()
        // setIsAuth(false)
        // updateProfileDateOnServer({fb_token: '0'})
    }

    const onPressCancel = () => {
        hideLogOutAnimMenu()
    }

    const animStyle = {
        transform: [
            {translateY: interpolateY},
        ],
    }

    if (isMounted) {
        return (
            <Animated.View style={[styles.container, animStyle, styleConfig.shadowMenu]}>
                <Text style={styles.title}>Are you sure you want to log out?</Text>
                <Button theme='white' onPress={onPressLogOut}>Log Out</Button>
                <Button onPress={onPressCancel}>Cancel</Button>
            </Animated.View>
        )
    } else return null
}

const styles = StyleSheet.create({
    container: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 16,
        paddingTop: 20,
        paddingHorizontal: styleConfig.screenPadding,
        width: '100%',
        height: 191,
        position: 'absolute',
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        bottom: 0,
    },
    title: {
        fontSize: 14,
        lineHeight: 18,
        fontFamily: 'IBMPlex-500',
        color: '#798293',
        textAlign: 'center',
    },
})
