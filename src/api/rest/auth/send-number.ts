import {createEffect} from 'effector'
import {urls} from '../../urls'
import {setDb} from '../../../../utils/db/set-db'
import {makeRequest} from '../../make-request'
import {setIsNumberValidateFailed} from '../../../screens/auth-stack-screen/login/models/models'
import {
    hideNumberErrorModal,
    showNumberErrorModal,
} from '../../../screens/auth-stack-screen/login/features/number-error-modal/models/models'
import {PHONENUMBER} from '../../../../utils/db/constants'

type result = {
    message: string
    success: boolean
}

export const sendNumber = createEffect(async (number: string): Promise<result | undefined> => {
    try {
        return await makeRequest({url: urls.sms(), method: 'POST', body: {phone_number: number}})
    } catch (e) {
        console.log('Send number ERROR: ', e)
    }
})

sendNumber.done.watch(({params, result}) => {
    if (result?.success) {
        setIsNumberValidateFailed(false)
        hideNumberErrorModal()
        setDb(PHONENUMBER, params)
    } else {
        showNumberErrorModal()
        setIsNumberValidateFailed(true)
    }
})
