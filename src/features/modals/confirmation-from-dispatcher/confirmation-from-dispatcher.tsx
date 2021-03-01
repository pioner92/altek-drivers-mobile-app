import React from 'react'
import {Text} from 'react-native'
import {useStore} from 'effector-react'
import {
    $animValueConfirmationFromDispatcherModal,
    $isMountedConfirmationFromDispatcherModal,
    setIsMountedConfirmationFromDispatcherModal,
} from './models/models'
import {AlertModalContainer} from '../alert-modal/alert-modal'
import {hideAlertModal} from '../alert-modal/models/models'

export const ConfirmationFromDispatcher: React.FC = () => {
    const value = useStore($animValueConfirmationFromDispatcherModal)
    const isMounted = useStore($isMountedConfirmationFromDispatcherModal)

    const onPress = async () => {
        await hideAlertModal(value)
        setIsMountedConfirmationFromDispatcherModal(false)
    }

    if (isMounted) {
        return (
            <AlertModalContainer
                title='Good to go'
                enableLeftButton={false}
                rightButtonLabel='Ok'
                onPressRightButton={onPress}
                value={value}
            >
                <Text>You have been manually released
                    by dispatcher.</Text>
            </AlertModalContainer>
        )
    } else {
        return null
    }
}

