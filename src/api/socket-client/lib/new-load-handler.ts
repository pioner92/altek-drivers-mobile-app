import {showNewLoadOfferMenu} from '../../../features/new-load-offer/models'
import {$selfStatus, statuses} from '../../../../hooks'
import {playSoundNotification} from '../../../../utils/notification/play-notification'
import {loadType} from '../../rest/loads/get-loads'
import {setCurrentLoad} from '../../../screens/main-stack-screen/load-info/models'
import {pushNotification} from '../../../../utils/notification/push-notification'

export const newLoadHandler = (data: loadType) => {
    if ($selfStatus.getState() === statuses.waiting) {
        pushNotification({
            title: `You've been assigned to load ${data.id}`,
            text: `${data.pickUpAt} —> ${data.deliverTo} for ${data.driver_price}$.`,
        })
        setCurrentLoad(data)
        playSoundNotification().then(() => {
            showNewLoadOfferMenu()
        })
    }
}
