import {createEffect} from 'effector'
import {urls} from '../urls'
import {getCurrentGeo} from '../../../utils/get-current-geo'
import {makeRequest} from '../make-request'

export const sendGeoToServer = createEffect(async () => {
    try {
        const location = await getCurrentGeo()
        return await makeRequest({
            url: urls.sendGeo(),
            method: 'POST',
            token: true,
            body: {location: `${location.latitude},${location.longitude}`},
        })
    } catch (e) {
        console.log(`Send geo to server ERROR: ${e}`)
    }
})
