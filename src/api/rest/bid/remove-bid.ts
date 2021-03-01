import {createEffect} from 'effector'
import {makeRequest} from '../../make-request'
import {urls} from '../../urls'

type removeBidResponseType = {
    success: boolean
}

export const removeBid = createEffect(async (id: number): Promise<removeBidResponseType | undefined> => {
    try {
        return await makeRequest({url: urls.removeBid(), token: true, method: 'POST', body: {bid_id: id}})
    } catch (e) {
        console.log('Remove bid ERROR: ', e)
    }
})
