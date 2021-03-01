import {createEffect} from 'effector'
import {urls} from '../../urls'
import {getDb} from '../../../../utils/db/get-db'
import {setDb} from '../../../../utils/db/set-db'
import {makeRequest} from '../../make-request'
import {EMAIL, PASSWORD, USERID} from '../../../../utils/db/constants'


type result = {
    'email': string,
    'group_id': number,
    'password': string,
    'success': boolean,
    'user_id': number,

}

export const auth = createEffect(async (code: string): Promise<result | undefined> => {
    try {
        const phoneNumber = await getDb('phoneNumber')
        return await makeRequest({url: urls.auth(), method: 'POST', body: {phone_number: phoneNumber, auth_code: code}})
    } catch (e) {
        console.log('Auth ERROR: ', e)
    }
})


auth.done.watch(({result}) => {
    if (result?.success) {
        setDb(USERID, result.user_id.toString())
        setDb(EMAIL, result.email)
        setDb(PASSWORD, result.password)
    }
})
