import {createEvent, createStore} from 'effector'
import {loadType} from '../../../../api/rest/loads/types'

export const setCurrentLoad = createEvent<loadType | null>()
export const resetCurrentLoad = createEvent()

export const $currentLoad = createStore<loadType | null>({} as loadType)
    .on(setCurrentLoad, ((state, payload) => payload))
    .reset(resetCurrentLoad)
