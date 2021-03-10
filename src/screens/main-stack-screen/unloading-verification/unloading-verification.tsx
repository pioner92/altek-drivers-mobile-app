import React from 'react'
import {StyleSheet, View} from 'react-native'
import {TitleGrey} from '../../../src/features/load-verified/ui/atoms'
import {Input} from '../../../src/ui/atoms/input'
import {TakenPicture} from '../../../src/ui/molecules/taken-pickture'
import {TakePictureMenu} from '../../../src/features/take-picture-menu'
import {useStore} from 'effector-react'
import {$inputValueUnloadedBy, setImageDataPod, setInputValueUnloadedBy} from './models'
import {useNavigate} from '../../../src/lib/hooks'
import {showStayAtPickUpMenu} from '../../../src/features/stay-at-pick-up/models/models'
import {hideTakePictureMenu, showTakePictureMenu} from '../../../src/features/take-picture-menu/models'
import links from '../../../links.json'
import {setButtonIsDisabled} from '../../../src/features/arrived-menu/models'
import {completedStatus} from '../../../hooks'
import {$imageDataPod, clearUnloadingData} from './models/models'
import {UploadDocumentService, UploadService} from '../../../src/api/rest/document-upload'
import {$currentLoad} from '../load-info/models'
import {Button} from '../../../src/ui/atoms/buttons'
import {styleConfig} from '../../../src/StyleConfig'
import {statusGenerate} from '../../../utils/check-statuses-with-init/check-statuses-with-init'
import {WhiteCard} from '../../../src/ui/atoms/card/white-card'
import {ScreenWrapper} from '../../../src/ui/atoms/screen-wrapper/screen-wrapper'
import {WrapperPaddingBottom} from '../../../src/ui/atoms/wrapper/wrapper-padding-bottom'
import {cameraHandler} from '../../../utils/cameraHandler/cameraHandler'
import {setLoad} from '../../../src/api/rest/loads/set-load'
import {sendStatusToServerSocketAction} from '../../../src/api/socket-client/socket-actions/socket-actions'

export const UnloadingVerification: React.FC = () => {
    const uploadDocument = new UploadDocumentService(new UploadService())
    const currentLoad = useStore($currentLoad)
    const inputValue = useStore($inputValueUnloadedBy)
    const navigate = useNavigate()
    const podImageData = useStore($imageDataPod)

    const onChange = (text: string) => {
        setInputValueUnloadedBy(text)
    }

    const openTakePictureMenu = () => {
        showTakePictureMenu()
    }

    const photo = (photo: string) => {
        photo && setImageDataPod(photo)
        hideTakePictureMenu()
    }

    const onTakenPicture = async () => {
        const callback = () => navigate(links.camera, {callback: photo})
        cameraHandler(callback)
    }


    const onConfirm = () => {
        podImageData && currentLoad && uploadDocument.uploadPodPicture(podImageData, currentLoad.id?.toString())
        setLoad({data: {recieved_by: inputValue}})

        navigate(links.home)

        clearUnloadingData()
        completedStatus()
        setButtonIsDisabled(true)
        showStayAtPickUpMenu()
        sendStatusToServerSocketAction({...statusGenerate.unloaded})
    }

    return (
        <ScreenWrapper isEnabledHeightController={true}>
            <View style={styles.container}>
                <TitleGrey style={{marginTop: 27}}>Received by</TitleGrey>
                <WhiteCard>
                    <Input type='default' onChange={onChange} value={inputValue} placeholder='Receiver name'/>
                </WhiteCard>
                <TitleGrey style={{marginTop: 32}}>Take Picture of the POD</TitleGrey>
                <TakenPicture callback={openTakePictureMenu}>Picture taken</TakenPicture>
                <WrapperPaddingBottom style={styles.btnWrapper}>
                    <Button onPress={onConfirm}>Confirm</Button>
                </WrapperPaddingBottom>
            </View>
            <TakePictureMenu
                title='Take Picture of the POD'
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
        backgroundColor: styleConfig.screenBackground,
    },
    btnWrapper: {
        marginTop: 'auto',
    },
})
