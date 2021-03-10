import React, {useEffect} from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {TakePictureMenu} from '../../../../src/features/take-picture-menu'
import {Input} from '../../../../src/ui/atoms/input'
import {useNavigate} from '../../../../src/lib/hooks'
import {useStore} from 'effector-react'
import {showStayAtPickUpMenu} from '../../../../src/features/stay-at-pick-up/models/models'
import links from '../../../../links.json'
import {setButtonIsDisabled} from '../../../../src/features/arrived-menu/models'
import {$imageDataTruck} from '../uploading-verification-step-3/models'
import {loadType} from '../../../../src/api/rest/loads/get-loads'
import {InputBol} from '../features/input-bol'
import {Load} from '../features'
import {TitleEditRow} from '../features/load-attributes/ui/moleculs'
import {TakenPictureRow} from '../features/load-attributes/ui/organisms'
import {$inputValuePieces, $inputValueWeight} from '../features/load-attributes/models'
import {$inputValueBol} from '../features/input-bol/models'
import {$imageDataBol} from '../uploading-verification-step-2/models'
import {$inputValueAddress, setInputValueAddress} from './models'
import {$currentLoad} from '../../load-info/models'
import {UploadDocumentService, UploadService} from '../../../../src/api/rest/document-upload'
import {Button} from '../../../../src/ui/atoms/buttons'
import {statusGenerate} from '../../../../utils/check-statuses-with-init/check-statuses-with-init'
import {WhiteCard} from '../../../../src/ui/atoms/card/white-card'
import {styleConfig} from '../../../../src/StyleConfig'
import {BtnWrapper} from '../../../../src/ui/atoms/wrapper/btn-wrapper'
import {setLoad} from '../../../../src/api/rest/loads/set-load'
import {clearUploadingData} from '../models/models'
import {ScreenWrapper} from '../../../../src/ui/atoms/screen-wrapper/screen-wrapper'
import {sendStatusToServerSocketAction} from '../../../../src/api/socket-client/socket-actions/socket-actions'


export const UploadingVerificationStep4: React.FC = () => {
    const uploadDocument = new UploadDocumentService(new UploadService())

    const navigate = useNavigate()
    const addressValue = useStore($inputValueAddress)
    const pickUpAt = useStore($currentLoad)?.pickUpAt
    const piecesValue = useStore($inputValuePieces)
    const weightValue = useStore($inputValueWeight)
    const bolValue = useStore($inputValueBol)
    const bolPicture = useStore($imageDataBol)
    const truckPicture = useStore($imageDataTruck)
    const loadId = useStore($currentLoad)?.id?.toString()


    const dataValidate = () => {
        const data = {} as Partial<loadType>

        piecesValue && (data.pieces_changed = +piecesValue)
        weightValue && (data.weight_changed = +weightValue)
        bolValue && (data.BOL = bolValue)
        addressValue && (data.pickUpAt_changed = addressValue)

        return data
    }

    const onClickContinue = () => {
        bolPicture && uploadDocument.uploadBolPicture(bolPicture, loadId!)
        truckPicture && uploadDocument.uploadTruckPicture(truckPicture, loadId!)

        setLoad({data: dataValidate()})
        navigate(links.home)

        clearUploadingData()
        setButtonIsDisabled(true)
        showStayAtPickUpMenu()
        sendStatusToServerSocketAction({...statusGenerate.uploaded})
    }


    const editBOLPicture = () => {
        navigate(links.loadingVerified2)
    }
    const editFrightPicture = () => {
        navigate(links.loadingVerified3)
    }

    useEffect(() => {
        setInputValueAddress(pickUpAt!)
    }, [])


    return (
        <ScreenWrapper isEnabledHeightController={true}>
            <ScrollView contentContainerStyle={{paddingHorizontal: styleConfig.screenPadding, paddingBottom: 30}}
                style={styles.container}>
                <TitleEditRow callback={() => {
                }}>Details</TitleEditRow>
                <Load leftColumnStyle={{flex: 2.5}} piecesDescription={'0x0x0'} weightDescription={'lbs'}/>
                <TitleEditRow callback={() => {
                }}>BOL</TitleEditRow>
                <InputBol/>
                <TitleEditRow callback={() => {
                }}>Address</TitleEditRow>
                <WhiteCard>
                    <Input placeholder='Address' onChange={setInputValueAddress} value={addressValue}/>
                </WhiteCard>
                <TitleEditRow callback={() => {
                }}>Uploaded Pictures</TitleEditRow>
                <TakenPictureRow callbackLeft={editBOLPicture} callbackRight={editFrightPicture}/>
            </ScrollView>
            <BtnWrapper style={{marginTop: 'auto'}}>
                <Button onPress={onClickContinue}>Continue</Button>
            </BtnWrapper>

            <TakePictureMenu title={''} callbackFirstButton={() => {
            }}/>
        </ScreenWrapper>
    )
}


const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#fff',
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
    takenPictureWrapper: {
        flexDirection: 'row',
        width: '100%',
        flex: 1,
    },
})
