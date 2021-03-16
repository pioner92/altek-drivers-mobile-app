import {hideStayAtPickUpMenu} from '../../../features/stay-at-pick-up/models/models'
import {hideArrivedMenu, setButtonIsDisabled} from '../../../features/arrived-menu/models/models'
import {$selfStatus, statuses, waitingStatus} from '../../../../hooks'
import {playSoundNotification} from '../../../lib/notification/play-notification'
import {setCurrentLoad} from '../../../screens/main-stack-screen/load-info/models'
import {showAlertModal} from '../../../features/modals/alert-modal/models/models'
import {
    $animValueCongratulationModal,
    setIsMountedCongratulationModal,
} from '../../../features/modals/congratulation/models/models'
import {resetCurrentLoad} from '../../../screens/main-stack-screen/load-info/models/models'

export const successUnloadHandler = async () => {
    if ($selfStatus.getState() === statuses.completed) {
        playSoundNotification()
        setIsMountedCongratulationModal(true)
        showAlertModal($animValueCongratulationModal.getState())
        resetCurrentLoad()
        await hideStayAtPickUpMenu()
        await hideArrivedMenu()

        waitingStatus()
        setButtonIsDisabled(false)
        setCurrentLoad(null)
    }
}
