import {createEffect} from 'effector'
import {urls} from '../../urls'
import {setDb} from '../../../../utils/db/set-db'
import {makeRequest} from '../../make-request'
import {FIRSTNAME, LASTNAME, TOKEN} from '../../../../utils/db/constants'

type dataType = {
    email: string
    password: string
}
type result = {
    token: string
    user: {
        email: string
        first_name: string
        last_name: string
        pk: number
        username: string
    }
}

export const login = createEffect(async ({email, password}: dataType): Promise<result | undefined> => {
    try {
        return await makeRequest({url: urls.login(), method: 'POST', body: {email, password}})
    } catch (e) {
        console.log('Login ERROR: ', e)
    }
})

login.done.watch(({result}) => {
    if (result?.token) {
        const {token, user: {first_name, last_name}} = result
        setDb(TOKEN, token)
        setDb(FIRSTNAME, first_name)
        setDb(LASTNAME, last_name)
    }
    // setRequestLock(false)
})
