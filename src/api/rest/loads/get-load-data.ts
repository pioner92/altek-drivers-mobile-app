import {createEffect} from 'effector'
import {urls} from '../../urls'
import {makeRequest} from '../../make-request'

export const getLoadData = createEffect(async (id: number) => {
    try {
        return await makeRequest({url: urls.loadData(id), method: 'GET', token: true})
    } catch (e) {
        console.log('Get load data ERROR: ', e)
    }
})

getLoadData.done.watch(({result}) => {
})
