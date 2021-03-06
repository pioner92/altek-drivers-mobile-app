import React, {useCallback} from 'react'
import {Dimensions, Platform, ScrollView, StyleSheet, View} from 'react-native'
import {ScreenWrapper} from '../../../../../ui/atoms/screen-wrapper/screen-wrapper'
import {PhotoProfileBlock} from './features/photo-profile-block'
import {PersonalInfo} from './features/personal-info/personal-info'
import {LogOut} from './features/log-out'
import {Button} from '../../../../../ui/atoms/buttons'
import {TakePictureMenu} from '../../../../../features/take-picture-menu'
import {Camera} from 'expo-camera'
import {useNavigate} from '../../../../../lib/hooks'
import {setUserPhoto} from '../../models'
import {imagePicker} from '../../../../../lib/image-picker'
import * as MediaLibrary from 'expo-media-library'
import {updateProfile} from '../../models/models'
import {styleConfig} from '../../../../../StyleConfig'
import {LogOutAnimMenu} from './features/log-out-anim-menu/log-out-anim-menu'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {useHeaderHeight} from '@react-navigation/stack'
import {links} from '../../../../../navigation/links'
import {updateAvatar} from '../../../../../api/rest/update-avatar'

export const EditProfile: React.FC = () => {
    const navigate = useNavigate()

    const inset = useSafeAreaInsets()
    const headerHeight = useHeaderHeight()

    const updateAvatart = (photo:string) => {
        setUserPhoto(photo)
        updateAvatar(photo)
    }


    const takePhoto = async () => {
        await MediaLibrary.requestPermissionsAsync()
        const {status} = await Camera.requestPermissionsAsync()
        status === 'granted' && navigate(links.camera, {callback: updateAvatart})
    }

    const getPhotoFromCameraRoll = async () => {
        const result = await imagePicker()
        if (!result.cancelled) {
            updateAvatart(result.uri)
        }
    }

    const onPressUpdateProfile = useCallback(() => {
        updateProfile()
        navigate(links.profile)
    }, [])

    return (
        <>
            <ScreenWrapper isEnabledHeightController={true}
                safeAreaStyle={{backgroundColor: styleConfig.screenBackground}}>
                <ScrollView contentContainerStyle={{height: Dimensions.get('window').height - headerHeight}}>
                    <View style={styles.container}>
                        <PhotoProfileBlock/>
                        <PersonalInfo/>
                        <LogOut/>
                        <View style={[styles.buttonWrapper, {paddingBottom: inset.bottom || Platform.OS === 'ios' ? 0 : 20}]}>
                            <Button onPress={onPressUpdateProfile} theme='white'>Update profile</Button>
                        </View>
                    </View>
                </ScrollView>
            </ScreenWrapper>
            <LogOutAnimMenu/>
            <TakePictureMenu
                style={{height: 120}}
                labelSecondButton='From Gallery'
                themeFirstButton='white'
                callbackFirstButton={takePhoto}
                callbackSecondButton={getPhotoFromCameraRoll}
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        paddingTop: 26,
        paddingHorizontal: 16,
    },
    buttonWrapper: {
        width: '100%',
        flex: 1,
        minHeight: 60,
        marginTop: 30,
        bottom: 20,
        justifyContent: 'flex-end',
    },
})
