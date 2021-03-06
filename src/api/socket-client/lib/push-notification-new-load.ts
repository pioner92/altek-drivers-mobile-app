import {calculationDistance} from './calculation-distance'
import {pushActions, pushNotification} from '../../../lib/notification/push-notification'
import {updateLoadsType} from '../types'

export const pushNotificationNewLoad = (data: updateLoadsType) => {
    const load = data.data[0]

    if (!load.start_location) {
        return
    }

    const geo = load.start_location.split(',')
    if (geo.length > 1) {
        const distance = calculationDistance(+geo[0], +geo[1])
        pushNotification({
            action: pushActions.newLoad,
            id: data.data[0]?.id,
            title: 'You can make a new bid on a load',
            text: `${load.pickUpAt} —> ${load.deliverTo}, ${load.miles} miles. 
${load.weight || '0'} LBS and ${load.pieces || '0'} PC, ${Math.ceil(distance)} miles out.`,
        })
    }
}
