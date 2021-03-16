import React from 'react'
import {StyleSheet, View} from 'react-native'
import {AddressConfirmationCard} from '../../../../features/load-verified/address/ui/organisms/address-confirmation-card'
import {TakenPicture} from '../../../../ui/molecules/taken-pickture'
import {useNavigate} from '../../../../lib/hooks'
import {TakePictureMenu} from '../../../../features/take-picture-menu'
import {TitleGrey} from '../../../../features/load-verified/ui/atoms'
import {setImageDataBol, setSelectedIndex} from './models'
import {hideTakePictureMenu, showTakePictureMenu} from '../../../../features/take-picture-menu/models'
import {InputBol} from '../features/input-bol'
import {useStore} from 'effector-react'
import {$currentLoad} from '../../load-info/models'
import {Button} from '../../../../ui/atoms/buttons'
import {WrapperPaddingBottom} from '../../../../ui/atoms/wrapper/wrapper-padding-bottom'
import {cameraHandler} from '../../../../lib/cameraHandler/cameraHandler'
import {ScreenWrapper} from '../../../../ui/atoms/screen-wrapper/screen-wrapper'
import {links} from '../../../../navigation/links'


export const UploadingVerificationStep2: React.FC = () => {
    const navigate = useNavigate()
    const pickUpAddress = useStore($currentLoad)?.pickUpAt

    const onChangeCheckBox = (index: number) => {
        setSelectedIndex(index)
    }

    const openTakePictureMenu = () => {
        showTakePictureMenu()
    }

    const onClickContinue = () => {
        navigate(links.loadingVerified3)
    }

    const photo = (photo: string) => {
        photo && setImageDataBol(photo)
        hideTakePictureMenu()
    }

    const onTakenPicture = async () => {
        const callback = () => navigate(links.camera, {callback: photo})
        cameraHandler(callback)
    }


    return (
        <ScreenWrapper isEnabledHeightController={true}>
            <View style={[styles.container]}>
                <TitleGrey>Type in BOL number</TitleGrey>
                <InputBol/>
                <TitleGrey style={{marginTop: 32}}>Does the delivery address on the BOL match the address
                    below?</TitleGrey>
                <AddressConfirmationCard callback={onChangeCheckBox}
                    text={pickUpAddress || ''}/>
                <TitleGrey style={{marginTop: 32}}>Take Picture of the BOL</TitleGrey>
                <TakenPicture callback={openTakePictureMenu}>Take a Picture</TakenPicture>
                <WrapperPaddingBottom style={styles.btnWrapper}>
                    <Button onPress={onClickContinue}>Continue</Button>
                </WrapperPaddingBottom>
            </View>
            <TakePictureMenu
                title='Take Picture of the BOL'
                callbackFirstButton={onTakenPicture}
                themeSecondButton='white'
            />
        </ScreenWrapper>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        paddingTop: 27,
    },
    btnWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 'auto',
    },
    title: {
        color: '#7E7E7E',
        fontSize: 14,
        fontFamily: 'IBMPlex-500',
        lineHeight: 18,
        marginBottom: 10,
        paddingLeft: 16,
        marginTop: 27,
    },
})
