import {hideStayAtPickUpMenu} from '../../../features/stay-at-pick-up/models/models'
import {toUnloadStatus} from '../../../../hooks'
import {setButtonIsDisabled} from '../../../features/arrived-menu/models'
import {playSoundNotification} from '../../../lib/notification/play-notification'
import {showAlertModal} from '../../../features/modals/alert-modal/models/models'
import {
    $animValueConfirmationFromDispatcherModal,
    setIsMountedConfirmationFromDispatcherModal,
} from '../../../features/modals/confirmation-from-dispatcher/models/models'

export const successUploadHandler = async () => {
    // if ($selfStatus.getState() === statuses.uploading) {
    playSoundNotification()
    setIsMountedConfirmationFromDispatcherModal(true)
    showAlertModal($animValueConfirmationFromDispatcherModal.getState())
    await hideStayAtPickUpMenu()
    toUnloadStatus()
    setButtonIsDisabled(false)

    // pushNotification({title:'Good to go',text:'You have been manually released by dispatcher'})
    // alertFn({title: 'Good to go', message: 'You have been manually released by dispatcher'})
    // }
}
