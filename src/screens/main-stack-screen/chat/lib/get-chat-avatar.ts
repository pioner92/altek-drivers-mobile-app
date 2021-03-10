import {chatUsersType} from '../../../../api/rest/chat/get-chats'
import {$selfId} from '../models/models'

export const getChatAvatar = (users: chatUsersType) => {
    const dispatcher = findDispatcherFromArr(users)
    if (dispatcher) {
        return dispatcher.avatar
    }
}

export const findDispatcherFromArr = (users: chatUsersType) => {
    const selfId = $selfId.getState()

    if (selfId) {
        const dispatcher = users.find((el) => el.toString() !== selfId.toString() && el.avatar)
        if (dispatcher) {
            return dispatcher
        }
    }
}
