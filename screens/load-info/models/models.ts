import {createEvent, createStore} from 'effector'
import {loadType} from '../../../src/api/rest/loads/get-loads'

export const setCurrentLoad = createEvent<loadType | null>()
export const resetCurrentLoad = createEvent()

export const $currentLoad = createStore<loadType | null>({} as loadType)
    .on(setCurrentLoad, ((state, payload) => payload))
    .reset(resetCurrentLoad)
