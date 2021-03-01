import {createEffect} from 'effector'
import {urls} from '../urls'
import {makeRequest} from '../make-request'


export const sendIsAvailableToServer = createEffect(async (status: boolean) => {
    try {
        return await makeRequest({
            url: urls.setProfile(),
            method: 'POST',
            body: {is_enable: status, status: status ? 1 : 12},
            token: true,
        })
    } catch (e) {
        console.log('Send is Available ERROR: ', e)
    }
})

