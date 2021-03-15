import {createEffect, createEvent} from 'effector'
import {urls} from '../../urls'
import {makeRequest} from '../../make-request'
import {loadType} from './types'

type data = {
    data?: {}
    id?: number
}
type statusData = {
    status: number
    substatus?: number
}
type setStatusData = {
    statuses: statusData
}
type setLoadDataType = Partial<loadType>


const loadStatus = (status: number, substatus?: number) => {
    const data = {status} as statusData
    substatus && (data.substatus = substatus)
    return {status, substatus}
}


export const statusNumbers = {
    acceptedNewLoad: loadStatus(2, 1),
    arrivedToPickUp: loadStatus(3, 1),
    loaded: loadStatus(3, 2),
    loadedAccepted: loadStatus(4, 2),
    arrivedToDelivery: loadStatus(5, 1),
    unloading: loadStatus(5, 2),
    completed: loadStatus(6),
}


export const setLoad = createEffect(async ({data, id}: data) => {
    if (id) {
        return await makeRequest({
            url: urls.setLoad(id),
            method: 'PUT',
            token: true,
            body: data,
        })
    }
},
)

setLoad.fail.watch(({error}) => {
    console.log('Set load ERROR: ', error)
})

export const setLoadStatus = createEvent<setStatusData>()
export const setLoadData = createEvent<setLoadDataType>()


setLoadStatus.watch(({statuses}) => setLoad({data: statuses}))

setLoadData.watch((data) => {
    setLoad({data, id: data.id})
})
