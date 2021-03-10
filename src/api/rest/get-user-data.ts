import {createEffect} from 'effector'
import {urls} from '../urls'
import {setCurrentLoad} from '../../screens/main-stack-screen/load-info/models'
import {makeRequest} from '../make-request'
import {loadType} from './loads/get-loads'
import {setCompanyHash} from '../../../Store/user-data'
import {setUserData} from '../../screens/main-stack-screen/profile/models/models'
import {login} from './auth/login'
import {getDb} from '../../../utils/db'
import {EMAIL, PASSWORD} from '../../../utils/db/constants'
import {FirebaseService} from '../../../utils/firebase-serivce/firebase-service'
import {updateProfileDateOnServer} from './update-profile'
import {notificationHandler} from '../../../utils/firebase-serivce/notification-handler'
import {sendLogOutPush} from './send-log-out-push'


type responseUserDataType = {
    added_by: {
        address: string
        avatar: string
        department: string
        email: string
        first_name: string
        id: number
        last_name: string
        last_online: string
        phone_number: string
        zip_code: string
    },
    address: string
    avatar: string
    company_info: {
        billing_preferences: string
        brokers_blacklist: string
        companies_blacklist: string
        company: string
        company_address: string
        company_hash: string
        company_logo: string
        company_mail_adress: string
        company_mail_host: string
        company_mail_password: string
        company_mail_port: number
        email_template: string
        parsing_domain: string
        parsing_email: string
        parsing_password: string
        parsing_port: number
        twilio_account_sid: string
        twilio_auth_token: string
        twilio_messaging_service_sid: string
        user: number
    },
    date_joined: string
    department: string
    drive_license: string
    driver_info: {
        app_activity_time: string
        available_time: string
        driver_loads: Array<loadType>
        in_app: boolean
        is_enable: boolean
        location: string
        owner: string
        responsible_user: string
        status: 'Available' | 'Non Available' | 'On load'
        unique_sms_key: string
        user: {
            address: string
            avatar: string
            department: string
            email: string
            first_name: string
            id: number
            last_name: string
            last_online: string
            phone_number: string
            zip_code: string
        },
        'working_car'
            :
            82,
    },
    email: string
    emergency_name: string
    emergency_phone: string
    first_name: string
    id: number
    is_active: boolean
    is_staff: boolean
    is_superuser: boolean
    last_login: string
    last_name: string
    last_online: string
    license_expiration_date: number
    modifiedDateTime: string
    my_working_group: string
    owner_info: string
    parent_department: string
    phone_number: string
    private_email_domain: string
    private_email_imap_domain: string
    private_email_imap_port: number
    private_email_password: string
    private_email_port: number
    removedDateTime: string
    unit_note: string
    user_owner: number
    working_group: string
    zip_code: string
}


export const getUserData = createEffect(async (): Promise<responseUserDataType | 401 | undefined> => {
    try {
        return await makeRequest({url: urls.userData(), method: 'GET', token: true})
    } catch (e) {
        console.log('Get user data ERROR: ', e)
    }
})


getUserData.done.watch(async ({result}) => {
    if (result && result !== 401) {
        setCompanyHash(result?.company_info?.company_hash)

        const {first_name, last_name, phone_number, id} = result

        setUserData({lastName: last_name, firstName: first_name, phone: phone_number, id})

        if (result.driver_info?.driver_loads[0]) {
            setCurrentLoad(result.driver_info.driver_loads[0])
        }

        sendLogOutPush(id)

        const fbToken = await FirebaseService.getToken()

        if (fbToken) {
            FirebaseService.foregroundMessageListener({handler: notificationHandler})
            updateProfileDateOnServer({fb_token: fbToken})
            FirebaseService.topicSubscribe(id.toString())
        }
    } else if (result && result === 401) {
        const email = await getDb(EMAIL)
        const password = await getDb(PASSWORD)

        if (email && password) {
            await login({email, password})
            getUserData()
        }
    }
})
