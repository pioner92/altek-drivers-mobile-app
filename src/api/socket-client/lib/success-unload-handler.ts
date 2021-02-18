import {hideStayAtPickUpMenu} from "../../../features/stay-at-pick-up/models/models";
import {hideArrivedMenu, setButtonIsDisabled} from "../../../features/arrived-menu/models/models";
import {$selfStatus, statuses, waitingStatus} from "../../../../hooks";
import {showSetAvailable} from "../../../features/set-available/models";
import {playSoundNotification} from "../../../../utils/notification/play-notification";
import {setCurrentLoad} from "../../../../screens/load-info/models";
import {showAlertModal} from "../../../features/modals/alert-modal/models/models";
import {
    $animValueCongratulationModal,
    setIsMountedCongratulationModal
} from "../../../features/modals/congratulation/models/models";

export const successUnloadHandler = async () => {
    if ($selfStatus.getState() === statuses.completed) {
        setIsMountedCongratulationModal(true)
        showAlertModal($animValueCongratulationModal.getState())

        await hideStayAtPickUpMenu()
        await hideArrivedMenu()

        waitingStatus()
        setButtonIsDisabled(false)
        setCurrentLoad(null)

        playSoundNotification()
    }
}
