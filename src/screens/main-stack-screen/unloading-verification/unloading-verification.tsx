import React from 'react'
import {StyleSheet, View} from 'react-native'
import {TitleGrey} from '../../../features/load-verified/ui/atoms'
import {Input} from '../../../ui/atoms/input'
import {TakenPicture} from '../../../ui/molecules/taken-pickture'
import {TakePictureMenu} from '../../../features/take-picture-menu'
import {useStore} from 'effector-react'
import {$inputValueUnloadedBy, setImageDataPod, setInputValueUnloadedBy} from './models'
import {useNavigate} from '../../../lib/hooks'
import {hideTakePictureMenu, showTakePictureMenu} from '../../../features/take-picture-menu/models'
import links from '../../../../links.json'
import {$imageDataPod, clearUnloadingData} from './models/models'
import {UploadDocumentService, UploadService} from '../../../api/rest/document-upload'
import {$currentLoad} from '../load-info/models'
import {Button} from '../../../ui/atoms/buttons'
import {styleConfig} from '../../../StyleConfig'
import {statusGenerate} from '../../../../utils/check-statuses-with-init/check-statuses-with-init'
import {WhiteCard} from '../../../ui/atoms/card/white-card'
import {ScreenWrapper} from '../../../ui/atoms/screen-wrapper/screen-wrapper'
import {WrapperPaddingBottom} from '../../../ui/atoms/wrapper/wrapper-padding-bottom'
import {cameraHandler} from '../../../../utils/cameraHandler/cameraHandler'
import {setLoad} from '../../../api/rest/loads/set-load'
import {sendStatusToServerSocketAction} from '../../../api/socket-client/socket-actions/socket-actions'

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
            .then(()=>{
                sendStatusToServerSocketAction({...statusGenerate.unloaded})
            })

        navigate(links.home)

        clearUnloadingData()
        // completedStatus()
        // setButtonIsDisabled(true)
        // showStayAtPickUpMenu()
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
