import React from 'react';
import {StyleSheet, View} from "react-native";
import {TakenPicture} from "../../../src/ui/molecules/taken-pickture";
import {TakePictureMenu} from "../../../src/features/take-picture-menu";
import {useNavigate} from "../../../src/lib/hooks";
import {hideTakePictureMenu, showTakePictureMenu} from "../../../src/features/take-picture-menu/models";
import {TitleGrey} from "../../../src/features/load-verified/ui/atoms";
import links from '../../../links.json'
import {setImageDataTruck} from "./models";
import {Button} from "../../../src/ui/atoms/buttons";
import {WrapperPaddingBottom} from "../../../src/ui/atoms/wrapper/wrapper-padding-bottom";
import {cameraHandler} from "../../../utils/cameraHandler/cameraHandler";
import {ScreenWrapper} from "../../../src/ui/atoms/screen-wrapper/screen-wrapper";


export const UploadingVerifiedStep3: React.FC = () => {

    const navigate = useNavigate()

    const onClickContinue = () => {
        navigate(links.loadingVerified4)
    }

    const openTakePictureMenu = () => {
        showTakePictureMenu()
    }
    const photo = (photo: string) => {
        photo && setImageDataTruck(photo)
        hideTakePictureMenu()
    }

    const onTakenPicture = async () => {
        const callback = ()=> navigate(links.camera, {callback: photo})
        cameraHandler(callback)
    }

    return (
        <ScreenWrapper isEnabledHeightController={true}>
            <View style={styles.container}>
                <TitleGrey>Take a picture of the freight in the truck </TitleGrey>
                <TakenPicture callback={openTakePictureMenu}>Take a Picture</TakenPicture>
                <WrapperPaddingBottom style={styles.btnWrapper}>
                    <Button  onPress={onClickContinue}>Continue</Button>
                </WrapperPaddingBottom>
            </View>
            <TakePictureMenu
                title='Take Picture of the freight'
                callbackFirstButton={onTakenPicture}
                themeSecondButton='white'
            />
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        paddingTop: 27
    },
    btnWrapper: {
        marginTop: 'auto',
    },
})
