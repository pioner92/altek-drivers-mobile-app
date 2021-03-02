import React, {useEffect} from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import {ChatRow} from '../../../src/chat/ChatRow'
import {getChats} from '../../../src/api/rest/chat/get-chats'
import {useStore} from 'effector-react'
import {ScreenWrapper} from '../../../src/ui/atoms/screen-wrapper/screen-wrapper'
import {getDb} from '../../../utils/db'
import {USERID} from '../../../utils/db/constants'
import {$chatsData, setIsAmInChat, setSelfId} from './models/models'
import {getChatAvatar} from './lib/get-chat-avatar'
import {StackScreenProps} from '@react-navigation/stack'
import links from '../../../links.json'
import {StackScreenCreator} from '../../../src/features/navigation/features/stack-screen-creator/stack-screen-creator'

const Chat: React.FC<StackScreenProps<any>> = ({navigation}) => {
    const chats = useStore($chatsData)

    const geUserId = async () => {
        const userId = await getDb(USERID)
        if (userId) {
            setSelfId(+userId)
        }
    }


    useEffect(() => {
        geUserId()
        setIsAmInChat(true)
        getChats()
    }, [])


    return (
        <ScreenWrapper enableNavigateButtons={false}>
            <ScrollView
                style={styles.container}>
                <View>
                    {chats.map((el) => {
                        return (
                            <ChatRow
                                unread_count={el.unread_count}
                                membersCount={el.users.length}
                                lastMessage={el.last_message.content}
                                avatar={el.load !== null ? getChatAvatar(el.users) || '' : ''}
                                loadId={el.load}
                                key={el.id}
                                time={new Date(el.modifiedDateTime).toTimeString().slice(0, 5)}
                                id={el.id}/>
                        )
                    })}
                </View>
            </ScrollView>
        </ScreenWrapper>
    )
}

export const ChatStackScreen = () => StackScreenCreator({link: links.chat, title: 'Chats', component: Chat})


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: '100%',
    },
})

