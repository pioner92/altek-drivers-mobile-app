import config from '../../../../config.json'
import {chatUsersType} from "./get-chats";
import {makeRequest} from "../../make-request";
import {createEffect} from "effector";
import {addNexPageMessages, setChatData} from "../../../../screens/chat/models/models";


export type mediaType = Array<{
    "chat": number,
    "created_date": string
    "extension": string
    "file_name": string
    "id": number
    "message": number
    "name": string
    "path": string
    "size": string
}>

export type messageType = {
    content: string
    files: mediaType | []
    chat_id:number
    modifiedDateTime: string
    user_from: {
        avatar: string
        department: string
        email?: string
        first_name: string
        id: number,
        last_name: string
        last_online?: string
    }
}

export type messagesType = Array<messageType>

export type getChatDataResponseType = {
    id: number,
    users: chatUsersType
    chat_group_messages: messagesType,
    created_date: string,
    modifiedDateTime: string,
    removedDateTime: string,
    company_id: number,
    hash_string: string,
    working_group: string,
    load: string
    pages_count: number
}


export const getChatData = createEffect(async (props: { id: number, page?: number }): Promise<getChatDataResponseType | undefined> => {
    try {
        return await makeRequest({
            url: `${config.get_Chats}${props.id}/?page=${props.page || 1}`,
            method: 'GET',
            token: true
        })
    } catch (e) {
        console.log('Get chat data ERROR: ', e)
    }
})

getChatData.done.watch(({result,params})=>{
    if(result) {
        if(params.page && params.page > 1){
            addNexPageMessages(result.chat_group_messages)
        }
        else {
            setChatData(result)
        }
    }
})

//
// export const getChatData = async (id: number, page?: number): Promise<getChatDataResponseType | undefined> => {
//     try {
//         return await makeRequest({url: `${config.get_Chats}${id}/?page=${page ? page : 1}`, method: 'GET', token: true})
//     } catch (e) {
//         console.log('Get chat data ERROR: ', e)
//     }
// }
