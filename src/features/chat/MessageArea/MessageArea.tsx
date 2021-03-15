import React, {useEffect, useState} from 'react'
import {FlatList, StyleSheet} from 'react-native'
import {MessageContainer} from './MessageContainer/MessageContainer'
import {getDb} from '../../../../utils/db/get-db'
import {getChatData} from '../../../api/rest/chat/get-chat-data'
import {useStore} from 'effector-react'
import {USERID} from '../../../../utils/db/constants'
import {
    $chatData,
    $chatMessages,
    $chatMessagesPage,
    setChatMessages,
    setChatMessagesPage,
} from '../../../screens/main-stack-screen/chat/models/models'
import {hideAttachMenu} from "../AttachMenu/models/models";


type propsType = {
    id: number
}

export const MessageArea: React.FC<propsType> = React.memo(({id}) => {
    const messages = useStore($chatMessages)
    const pages = useStore($chatData).pages_count
    const messagesPage = useStore($chatMessagesPage)
    const [userId, setUserId] = useState(0)
    const dates = new Set()


    useEffect(() => {
        getDb(USERID)
            .then((data) => data && setUserId(+data))
        return () => {
            setChatMessages([])
        }
    }, [])

    useEffect(() => {
        if (messagesPage > 1 && messagesPage <= pages) {
            getChatData({id, page: messagesPage})
        }
    }, [messagesPage])


    const isVisibleMessagesDate = (value: string) => {
        if (dates.has(value.slice(0, 10))) {
            return false
        }
        dates.add(value.slice(0, 10))
        return true
    }

    const isImage = (format:string) => {
        return format === 'jpg' ||
            format === 'jpeg' ||
            format === 'png' ||
            format === 'tiff' ||
            format === 'bmp' ||
            format === 'gif'
    }

    return (
        <FlatList
            onTouchStart={()=>hideAttachMenu()}
            inverted={true}
            style={styles.container}
            contentContainerStyle={{paddingTop: 10}}
            data={messages}
            initialNumToRender={10}
            onEndReachedThreshold={0}
            keyExtractor={(item) => item.modifiedDateTime?.toString()}
            onEndReached={() => {
                setChatMessagesPage()
            }}
            renderItem={({item}) => {
                return (
                    <MessageContainer
                        isVisibleDateRow={isVisibleMessagesDate(item.modifiedDateTime)}
                        text={item.content}
                        img={item.user_from?.avatar || ''}
                        type={item.files.length > 0 ? isImage(item.files[0].extension) ? 'image' : 'file' : 'text'}
                        files={item.files || []}
                        from={item.user_from.first_name}
                        bySelf={userId === item.user_from.id}
                        position={item.user_from.department}
                        time={new Date(item.modifiedDateTime).toTimeString().slice(0, 5)}
                    />
                )
            }
            }
        >
        </FlatList>
    )
})

const styles = StyleSheet.create({
    container: {
        flex: 10,
        width: '100%',
        paddingHorizontal: 15,
        top: 0,
    },
})
