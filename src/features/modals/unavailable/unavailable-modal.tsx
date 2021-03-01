import React from 'react'
import {Text} from 'react-native'
import {useStore} from 'effector-react'
import {$animValueUnavailableModal, $isMountedUnavailableModal, setIsMountedUnavailableModal} from './models'
import {setIsAvailable} from '../../set-available/models'
import {AlertModalContainer} from '../alert-modal/alert-modal'
import {hideAlertModal} from '../alert-modal/models/models'


export const UnavailableModal: React.FC = () => {
    const isMounted = useStore($isMountedUnavailableModal)
    const value = useStore($animValueUnavailableModal)


    const unavailable = async () => {
        await new Promise((resolve) => {
            setIsAvailable(false)
            resolve()
        })
        setIsMountedUnavailableModal(false)
    }

    const onPressYes = async () => {
        // hideAlertModal({value, callback: unavailable})
        await hideAlertModal(value)
        setIsAvailable(false)
        setIsMountedUnavailableModal(false)
    }

    const closeModal = async () => {
        // hideAlertModal({value, callback: () => setIsMountedUnavailableModal(false)})
        await hideAlertModal(value)
        setIsMountedUnavailableModal(false)
    }

    if (isMounted) {
        return (
            <AlertModalContainer
                title={'Do you want to stop working?'}
                leftButtonLabel='No'
                enableLeftButton={true}
                rightButtonLabel='Yes'
                onPressLeftButton={closeModal}
                onPressRightButton={onPressYes}
                value={value}
            >
                <Text>Do you want to stop working?</Text>
            </AlertModalContainer>
        )
    } else {
        return null
    }
}

