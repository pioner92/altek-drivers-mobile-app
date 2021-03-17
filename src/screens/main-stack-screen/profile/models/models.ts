import {createEvent, createStore, sample} from 'effector'
import {getDb, setDb} from '../../../../lib/db'
import {
    $inputValueUserName,
    $inputValueUserPhone,
    setInputValueUserName,
    setInputValueUserPhone,
} from '../screens/edit-profile/features/personal-info/models/models'
import {updateProfileDateOnServer} from '../../../../api/rest/update-profile'
import {FIRSTNAME, LASTNAME, PHONENUMBER} from '../../../../lib/db/constants'
import {responseUserDataType} from '../../../../api/rest/get-user-data'


export const setUserPhoto = createEvent<string>()
export const setUserData = createEvent<responseUserDataType>()
export const setUserFirstName = createEvent<string>()
export const setUserLastName = createEvent<string>()
export const setUserPhone = createEvent<string>()
export const initUserData = createEvent()
export const updateProfile = createEvent()

export const resetUserDataStore = createEvent()


export const $userData = createStore({} as responseUserDataType)
    .on(setUserData, (state, payload) => payload)
    .on(setUserFirstName, (state, payload) => ({...state, firstName: payload}))
    .on(setUserLastName, (state, payload) => ({...state, lastName: payload}))
    .on(setUserPhone, (state, payload) => ({...state, phone: payload}))
    .reset(resetUserDataStore)

export const $userPhoto = createStore<string>('')
    .on(setUserPhoto, (state, payload) => payload)

initUserData.watch(async () => {
    const firstName = await getDb(FIRSTNAME)
    const lastName = await getDb(LASTNAME)
    const phone = await getDb(PHONENUMBER)
    // const id = await getDb(USERID)

    setInputValueUserName(`${firstName} ${lastName}`)
    setInputValueUserPhone(`${phone}`)
})


const handler = sample({
    source: {userName: $inputValueUserName, userPhone: $inputValueUserPhone},
    clock: updateProfile,
    fn: (states, _) => (states),
})

handler.watch(({userName, userPhone})=>{
    const fullName = userName.split(' ')
    const phone = userPhone

    setUserPhone(phone)
    setDb(PHONENUMBER, phone || '')

    setUserFirstName(fullName[0] || '')
    setDb(FIRSTNAME, fullName[0] || '')

    setUserLastName(fullName[1] || '')
    setDb(LASTNAME, fullName[1] || '')

    updateProfileDateOnServer({firstName: fullName[0] || '', lastName: fullName[1] || ''})
})

