import {getDb} from './db'
import {USERID} from './db/constants'

export const getIsAuth = async (): Promise<boolean> => {
    const result = await getDb(USERID)
    if (result) {
        return true
    }
    return false
}
