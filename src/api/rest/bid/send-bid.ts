import {createEffect} from 'effector'
import {makeRequest} from '../../make-request'
import {urls} from '../../urls'
import {startTimer} from '../../../features/button-with-counter/models/models'
import {setDb} from '../../../lib/db'
import {TIMERBID} from '../../../lib/db/constants'

type sendBidDataType = {
    load: number
    price: number
}

type sendBidResponseType = {
    success: boolean
    bid: number
}

export const sendBid = createEffect(async ({load, price}: sendBidDataType): Promise<sendBidResponseType | undefined> => {
    try {
        return await makeRequest({
            url: urls.sendBid(),
            method: 'POST',
            token: true,
            body: {load: load.toString(), price},
        })
    } catch (e) {
        console.log('Send bid ERROR: ', e)
    }
})

sendBid.done.watch(({result}) => {
    if (result?.success) {
        setDb(TIMERBID, Date.now().toString())
        startTimer()
    }
})
