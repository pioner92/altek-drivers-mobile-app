import {createEffect} from 'effector'
import {urls} from '../../urls'
import {makeRequest} from '../../make-request'
import {loadType} from './get-loads'

type responseType = {
    load_data:loadType
}

export const getLoadData = createEffect(async (id: number):Promise<responseType | undefined> => {
    try {
        return await makeRequest({url: urls.loadData(id), method: 'GET', token: true})
    } catch (e) {
        console.log('Get load data ERROR: ', e)
    }
})

getLoadData.done.watch(({result}) => {
})
