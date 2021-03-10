import {createEvent, createStore} from 'effector'
import {setDb} from '../utils/db/set-db'
import {COMPANYHASH} from '../utils/db/constants'

export const setCompanyHash = createEvent<string>()
export const $companyHash = createStore('')
    .on(setCompanyHash, (state, payload) => payload)


setCompanyHash.watch((payload) => {
    setDb(COMPANYHASH, payload.toString())
})
