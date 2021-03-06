import React, {useEffect, useRef, useState} from 'react'
import {StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {Camera} from 'expo-camera'
import {FlashOnSVG} from '../../../ui/atoms/icons/flash-on-svg'
import {FlashOffSVG} from '../../../ui/atoms/icons/flash-off-svg'
import {CameraSVG} from '../../../ui/atoms/icons'
import {StackScreenProps} from '@react-navigation/stack'
import {CameraReverseSVG} from '../../../ui/atoms/icons/camera-reverse-svg'
import * as MediaLibrary from 'expo-media-library'

type routeType = {
    callback: (image: string | undefined) => void
}

export const CameraScreen: React.FC<StackScreenProps<routeType>> = ({route, navigation}) => {
    const routeData = route.params as routeType
    const callback = routeData.callback

    const camera = useRef<Camera>(null)
    const [type, setType] = useState(Camera.Constants.Type.back)
    const [flashMode, setFlashMode] = useState(false)

    const takePhoto = async () => {
        const data = await camera?.current?.takePictureAsync()
        callback && callback(data?.uri)
        if (data?.uri) {
            MediaLibrary.saveToLibraryAsync(data.uri)
        }
        navigation.goBack()
    }

    const setFlashModeHandler = () => {
        setFlashMode((prevState) => !prevState)
    }

    const setCameraMode = () => {
        if (type === Camera.Constants.Type.back) {
            setType(Camera.Constants.Type.front)
        } else {
            setType(Camera.Constants.Type.back)
        }
    }

    const onPressBack = () => {
        navigation.goBack()
    }

    useEffect(() => {
        (async () => {
            const {status} = await Camera.requestPermissionsAsync()
        })()
    }, [])

    return (
        <Camera
            ref={camera}
            style={styles.camera}
            flashMode={Camera.Constants.FlashMode[flashMode ? 'on' : 'off']}
            type={type}>
            <BackButton onPress={onPressBack}/>
            <View style={styles.buttonWrapper}>
                <TouchableOpacity style={styles.button} onPress={takePhoto}>
                    <CameraSVG size={40} color={'#fff'}/>
                </TouchableOpacity>
            </View>
            <View style={styles.panel}>
                <TouchableOpacity onPress={setFlashModeHandler} style={styles.flashMode}>
                    {flashMode ?
                        <FlashOnSVG size={20}/> :
                        <FlashOffSVG size={20}/>
                    }
                </TouchableOpacity>
                <TouchableOpacity onPress={setCameraMode}>
                    <CameraReverseSVG/>
                </TouchableOpacity>
            </View>
            <StatusBar barStyle='light-content'/>
        </Camera>
    )
}

type backButtonPropsType = {
    onPress: () => void
}

const BackButton: React.FC<backButtonPropsType> = ({onPress}) => {
    return (
        <TouchableOpacity onPress={onPress} style={{top: 50, paddingLeft: 20}}>
            <Text style={{color: '#fff', fontSize: 30}}>←</Text>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    container: {},
    camera: {
        flex: 1,
    },
    buttonWrapper: {
        marginTop: 'auto',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    button: {
        marginTop: 'auto',
        paddingBottom: 20,
    },
    flashMode: {},
    panel: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0,0,0,0.8)',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
})
