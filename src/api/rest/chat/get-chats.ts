import {makeRequest} from '../../make-request'
import {urls} from '../../urls'
import {createEffect} from 'effector'
import {setChatsData} from '../../../screens/main-stack-screen/chat/models/models'


type lastMessageType = {
    content: string
    user_from: string
    user_to: string
    toNumber: string
    status: string
}

export type userType = {
    id: number
    email: string
    address: string
    first_name: string
    last_name: string
    phone_number: string
    avatar: string
    department: string
    last_online: string
}

export type chatUsersType = Array<userType>


export type getChatsResponseType = Array<{
    id: number,
    last_message: lastMessageType
    users: chatUsersType
    unread_count: number
    created_date: string
    modifiedDateTime: string
    removedDateTime: string
    company_id: number
    hash_string: string
    working_group: string
    load: number
}>


export const getChats = createEffect(async (): Promise<getChatsResponseType | undefined> => {
    try {
        return await makeRequest({url: urls.getChats(), method: 'GET', token: true})
    } catch (error) {
        console.log('Error get chat')
        console.log(error)
    }
})

getChats.done.watch(({result}) => {
    if (result) {
        setChatsData(result)
    }
})


