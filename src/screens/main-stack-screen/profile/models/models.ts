import {createEvent, createStore} from 'effector'
import {getDb, setDb} from '../../../../utils/db'
import {
    $inputValueUserName,
    $inputValueUserPhone,
    setInputValueUserName,
    setInputValueUserPhone,
} from '../screens/edit-profile/features/personal-info/models/models'
import {updateProfileDateOnServer} from '../../../../src/api/rest/update-profile'
import {FIRSTNAME, LASTNAME, PHONENUMBER, USERID} from '../../../../utils/db/constants'

type userDataType = {
    firstName: string | undefined
    lastName: string | undefined
    phone: string | undefined
    id: number | undefined
}

export const setUserPhoto = createEvent<string>()
export const setUserData = createEvent<userDataType>()
export const setUserFirstName = createEvent<string>()
export const setUserLastName = createEvent<string>()
export const setUserPhone = createEvent<string>()
export const initUserData = createEvent()
export const updateProfile = createEvent()

export const resetUserDataStore = createEvent()


export const $userData = createStore({} as userDataType)
    .on(setUserData, (state, payload) => payload)
    .on(setUserFirstName, (state, payload) => ({...state, firstName: payload}))
    .on(setUserLastName, (state, payload) => ({...state, lastName: payload}))
    .on(setUserPhone, (state, payload) => ({...state, phone: payload}))
    .reset(resetUserDataStore)

export const $userPhoto = createStore<string>('')
    .on(setUserPhoto, ((state, payload) => payload))

initUserData.watch(async () => {
    const firstName = await getDb(FIRSTNAME)
    const lastName = await getDb(LASTNAME)
    const phone = await getDb(PHONENUMBER)
    const id = await getDb(USERID)

    setInputValueUserName(`${firstName} ${lastName}`)
    setInputValueUserPhone(`${phone}`)
    setUserData({firstName, lastName, phone, id: Number(id)})
})


updateProfile.watch(() => {
    const fullName = $inputValueUserName.getState().split(' ')
    const phone = $inputValueUserPhone.getState()

    setUserPhone(phone)
    setDb(PHONENUMBER, phone || '')

    setUserFirstName(fullName[0] || '')
    setDb(FIRSTNAME, fullName[0] || '')

    setUserLastName(fullName[1] || '')
    setDb(LASTNAME, fullName[1] || '')

    updateProfileDateOnServer({firstName: fullName[0] || '', lastName: fullName[1] || ''})
})
