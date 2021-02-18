import {calculationDistance} from "./calculation-distance";
import {updateLoadsType} from "../socket-client";
import {pushNotification} from "../../../../utils/notification/push-notification";

export const pushNotificationNewLoad = (data: updateLoadsType) => {
    const load = data.data[0]

    if (!load.start_location) {
        return
    }

    const geo = load.start_location.split(',')
    if (geo.length > 1) {
        const distance = calculationDistance(+geo[0], +geo[1])
        if (distance <= 200) {
            pushNotification({
                title: 'You can make a new bid on a load',
                text: `${load.pickUpAt} —> ${load.deliverTo}, ${load.miles} miles. 
${load.weight || '0'} LBS and ${load.pieces || '0'} PC, ${Math.ceil(distance)} miles out.`
            })
        }
    }
}