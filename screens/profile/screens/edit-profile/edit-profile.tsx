import React from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from "react-native";
import {ScreenWrapper} from "../../../../src/ui/atoms/screen-wrapper/screen-wrapper";
import {PhotoProfileBlock} from "./features/photo-profile-block";
import {PersonalInfo} from "./features/personal-info/personal-info";
import {LogOut} from "./features/log-out";
import {Button} from "../../../../src/ui/atoms/buttons";
import {TakePictureMenu} from "../../../../src/features/take-picture-menu";
import {Camera} from 'expo-camera';
import {useNavigate} from "../../../../src/lib/hooks";
import links from '../../../../links.json'
import {setDb} from "../../../../utils/db";
import {setUserPhoto} from "../../models";
import {imagePicker} from "../../../../utils/image-picker";
import * as MediaLibrary from "expo-media-library";
import {updateProfile} from "../../models/models";
import {styleConfig} from "../../../../src/StyleConfig";
import {LogOutAnimMenu} from "./features/log-out-anim-menu/log-out-anim-menu";
import {PHOTOPROFILE} from "../../../../utils/db/constants";


export const EditProfile: React.FC = () => {
    const navigate = useNavigate()

    const photo = (photo: string) => {
        setDb(PHOTOPROFILE, photo)
        setUserPhoto(photo)
    }

    const takePhoto = async () => {
        await MediaLibrary.requestPermissionsAsync()
        const {status} = await Camera.requestPermissionsAsync();
        status === 'granted' && navigate(links.camera, {callback: photo})
    }

    const getPhotoFromCameraRoll = async () => {
        let result = await imagePicker()
        if (!result.cancelled) {
            setUserPhoto(result.uri)
            setDb(PHOTOPROFILE, result.uri)
        }
    }

    return (
        <>
            <ScreenWrapper isEnabledHeightController={true} enableNavigateButtons={true} >
                    <ScrollView contentContainerStyle={{height:Dimensions.get("window").height}} >
                        <View style={styles.container}>
                {/*<KeyboardAvoidingView behavior={Platform.OS === "ios"?'padding':'position'} style={{flex: 1}}>*/}
                {/*        <View style={{flex:1}}>*/}
                            <PhotoProfileBlock/>
                            <PersonalInfo/>
                            <LogOut/>
                        {/*</View>*/}

                        <View style={{
                            width: '100%',
                            minHeight:150,
                            marginTop:'auto',
                            justifyContent: "flex-end",
                            paddingBottom: 80
                        }}>
                            <Button onPress={() => updateProfile()} theme='white'>Update profile</Button>
                        </View>
                {/*</KeyboardAvoidingView>*/}
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
    );
};

const styles = StyleSheet.create({
    container: {
        height:'100%',
        paddingTop: 26,
        paddingHorizontal: 16
    },
    camera: {
        height: 500,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
    button: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
    logOutMenu: {
        height: 120,
        justifyContent: "space-between",
        paddingHorizontal: styleConfig.screenPadding
    }
})
