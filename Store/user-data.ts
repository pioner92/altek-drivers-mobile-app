import {createEvent} from 'effector'
import {initSocketClient} from '../src/api/socket-client/socket-client'
import {setDb} from '../utils/db/set-db'
import {COMPANYHASH} from '../utils/db/constants'

export const setCompanyHash = createEvent<string>()


setCompanyHash.watch(((payload) => {
    if (payload) {
        setDb(COMPANYHASH, payload.toString())
        initSocketClient(payload)
    }
}))
