import {showNewLoadOfferMenu} from '../../../features/new-load-offer/models'
import {$selfStatus, statuses} from '../../../../hooks'
import {playSoundNotification} from '../../../../utils/notification/play-notification'
import {setCurrentLoad} from '../../../screens/main-stack-screen/load-info/models'
import {pushNotification} from '../../../../utils/notification/push-notification'
import {loadType} from '../../rest/loads/types'
import {createEvent, sample} from 'effector'

export const newLoadHandler = createEvent<loadType>()

const handler = sample({
    source: $selfStatus,
    clock: newLoadHandler,
    fn: (selfStatus, load) => ({selfStatus, load}),
})

handler.watch(({selfStatus, load})=> {
    if (selfStatus === statuses.waiting) {
        pushNotification({
            title: `You've been assigned to load ${load.id}`,
            text: `${load.pickUpAt} —> ${load.deliverTo} for ${load.driver_price}$.`,
        })
        setCurrentLoad(load)
        playSoundNotification().then(() => {
            showNewLoadOfferMenu()
        })
    }
})
