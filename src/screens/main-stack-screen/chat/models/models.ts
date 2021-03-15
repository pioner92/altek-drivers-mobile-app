import {createEvent, createStore} from 'effector'
import {getChatDataResponseType, messagesType} from '../../../../api/rest/chat/get-chat-data'
import {getChatsResponseType} from '../../../../api/rest/chat/get-chats'

export const setIsNewMessageInChat = createEvent<boolean>()
export const setIsInChat = createEvent<boolean>()
export const setSelfId = createEvent<number>()

export const setChatsData = createEvent<getChatsResponseType>()
export const setChatMessages = createEvent<messagesType>()
export const addNewChatMessage = createEvent<messagesType>()
export const addNexPageMessages = createEvent<messagesType>()
export const setChatMessagesPage = createEvent()
export const setChatData = createEvent<getChatDataResponseType>()
export const setUnreadCount = createEvent<{ id: number, count?: number, content?: string }>()

export const resetChatsData = createEvent()


export const $chatsData = createStore<getChatsResponseType>([])
    .on(setChatsData, (state, payload) => payload)
    .on(setUnreadCount, (state, payload) => [...unreadCountHandler(state, payload.id, payload.count, payload.content)])
    .reset(resetChatsData)

export const $chatData = createStore<getChatDataResponseType>({} as getChatDataResponseType)
    .on(setChatData, (state, payload) => {
        setChatMessages(payload.chat_group_messages)
    })

export const $chatMessages = createStore<messagesType>([] as messagesType)
    .on(setChatMessages, (state, payload) => payload)
    .on(addNewChatMessage, (state, payload) => [...payload, ...state])
    .on(addNexPageMessages, (state, payload) => [...state, ...payload])

export const $chatMessagesPage = createStore(1)
    .on(setChatMessagesPage, (state) => state + 1)

export const $isNewMessageInChat = createStore(false)
    .on(setIsNewMessageInChat, (state, payload) => payload)

export const $isInChat = createStore(false)
    .on(setIsInChat, (state, payload) => payload)

export const $selfId = createStore<number | null>(null)
    .on(setSelfId, (state, payload) => payload)


const unreadCountHandler = (state: getChatsResponseType, id: number, count?: number, content?: string) => {
    const index = state.findIndex((el) => el.id === id)
    if (index !== -1) {
        state[index].unread_count = count === undefined ? state[index].unread_count + 1 : 0
        if (content) {
            state[index].last_message.content = content
        }
        const chat = [...state][index]
        state.splice(index, 1)
        state.unshift(chat)
    }
    return state
}
