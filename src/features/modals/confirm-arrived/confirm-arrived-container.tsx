import {$selfStatus, statuses, unloadingStatus, uploadingStatus} from '../../../../hooks'
import {ConfirmArrived} from './confirm-arrived'
import React from 'react'
import {useStore} from 'effector-react'
import {$currentLoad} from '../../../../screens/load-info/models'
import {hideAlertModal} from '../alert-modal/models/models'
import {setIsMountedConfirmArrivedModal} from './models'
import {sendStatusToServerSocketAction} from '../../../api/socket-client/socket-actions/socket-actions'
import {statusGenerate} from '../../../../utils/check-statuses-with-init/check-statuses-with-init'
import {$animValueUnavailableModal} from '../unavailable/models'

export const ConfirmArrivedContainer = () => {
    const selfStatus = useStore($selfStatus)
    const currentLoad = useStore($currentLoad)

    const value = useStore($animValueUnavailableModal)


    const onAcceptArrivedPickUp = async () => {
        await hideAlertModal(value)
        setIsMountedConfirmArrivedModal(false)
        uploadingStatus()
        sendStatusToServerSocketAction({...statusGenerate.uploading})
    }

    const onAcceptArrivedDelivery = async () => {
        await hideAlertModal(value)
        setIsMountedConfirmArrivedModal(false)
        unloadingStatus()
        sendStatusToServerSocketAction({...statusGenerate.unloading})
    }

    return (
        <>
            {selfStatus === statuses.toUpload && currentLoad ?
                <ConfirmArrived callback={onAcceptArrivedPickUp}>{currentLoad?.pickUpAt}?</ConfirmArrived> :
                null
            }
            {selfStatus === statuses.toUnload && currentLoad ?
                <ConfirmArrived callback={onAcceptArrivedDelivery}>{currentLoad?.deliverTo}?</ConfirmArrived> :
                null
            }
        </>
    )
}
