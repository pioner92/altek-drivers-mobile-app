import {createEvent, createStore} from 'effector'
import {setDb} from '../src/lib/db/set-db'
import {COMPANYHASH} from '../src/lib/db/constants'

export const setCompanyHash = createEvent<string>()
export const $companyHash = createStore('')
    .on(setCompanyHash, (state, payload) => payload)


setCompanyHash.watch((payload) => {
    setDb(COMPANYHASH, payload.toString())
})
