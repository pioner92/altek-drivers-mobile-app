import React, {useEffect} from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import {ChatRow} from '../../../features/chat/ChatRow'
import {getChats} from '../../../api/rest/chat/get-chats'
import {useStore} from 'effector-react'
import {ScreenWrapper} from '../../../ui/atoms/screen-wrapper/screen-wrapper'
import {getDb} from '../../../lib/db'
import {USERID} from '../../../lib/db/constants'
import {$chatsData, setIsInChat, setSelfId} from './models/models'
import {getChatAvatar} from './lib/get-chat-avatar'
import {StackScreenCreator} from '../../../features/navigation/features/stack-screen-creator/stack-screen-creator'
import {links} from '../../../navigation/links'

const Chat: React.FC = React.memo(() => {
    const chats = useStore($chatsData)
    const geUserId = async () => {
        const userId = await getDb(USERID)
        if (userId) {
            setSelfId(+userId)
        }
    }

    const init = async () => {
        await geUserId()
        setIsInChat(true)
        getChats()
    }


    useEffect(() => {
        init()
    }, [])


    return (
        <ScreenWrapper>
            <ScrollView
                style={styles.container}>
                <View>
                    {chats?.map((el) => {
                        return (
                            <ChatRow
                                unread_count={el?.unread_count}
                                membersCount={el?.users?.length}
                                lastMessage={el?.last_message?.content}
                                avatar={el?.load !== null ? getChatAvatar(el?.users) || '' : ''}
                                loadId={el?.load}
                                key={el?.id}
                                time={new Date(el?.modifiedDateTime)?.toTimeString()?.slice(0, 5)}
                                id={el?.id}/>
                        )
                    })}
                </View>
            </ScrollView>
        </ScreenWrapper>
    )
})

export const ChatStackScreen = () => StackScreenCreator({link: links.chat, title: 'Chats', component: Chat})


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: '100%',
    },
})

