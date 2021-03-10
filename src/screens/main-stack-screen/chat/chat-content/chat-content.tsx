import React, {useEffect, useLayoutEffect, useState} from 'react'
import {KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View} from 'react-native'
import {useSpring, useTiming, useValue} from '../../../../../utils/animation-hooks/Hooks'
import * as ImagePicker from 'expo-image-picker'
import {InputContainer} from '../../../../features/chat/InputContent/InputContainer'
import {AttachModal} from '../../../../features/chat/AttachModal/AttachModal'
import {MessageArea} from '../../../../features/chat/MessageArea/MessageArea'
import {getChatData} from '../../../../api/rest/chat/get-chat-data'
import {StackScreenProps, useHeaderHeight} from '@react-navigation/stack'
import {$chatsData, setIsInChat, setIsNewMessageInChat, setUnreadCount} from '../models/models'
import {sendChatMessageSocketAction} from '../../../../api/socket-client/socket-actions/socket-actions'
import {MoreSVG} from '../../../../ui/atoms/icons/more-svg'
import {ChatHeader} from './ui/moleculs/chat-header'
import {uploadFile} from '../../../../api/rest/upload-file'
import {useStore} from 'effector-react'
import {$swipeMenuWrapperValueDY} from '../../../../features/swipe-menu-wrapper/models/models'
import {ScreenWrapper} from '../../../../ui/atoms/screen-wrapper/screen-wrapper'
import {getChatAvatar} from '../lib/get-chat-avatar'
import * as DocumentPicker from 'expo-document-picker'

type imagePickerResultType = {
    cancelled: boolean
    height: number
    type: 'image'
    uri: string
    width: number
}


export type chatContentPropsType = {
    id: number
}


export const ChatContent: React.FC<StackScreenProps<{ item: chatContentPropsType }>> = ({route, navigation}) => {
    const params = route.params as chatContentPropsType

    const {id} = params
    const dy = useStore($swipeMenuWrapperValueDY)
    const [isOpened, setIsOpened] = useState(false)

    const chats = useStore($chatsData)

    const headerHeight = useHeaderHeight()


    const value = useValue(0)

    const openAttachModal = () => {
        setIsOpened(true)
        useSpring(value, 1, 10, 9).start()
    }

    const closeAttachModal = () => {
        useTiming(value, 0, 300).start(() => {
            setIsOpened(false)
        })
    }

    const getMediaType = (media: string) => {
        return media.match(/\.([a-z]+)/)?.[1]
    }

    const pickDocument = async () => {
        const result = await DocumentPicker.getDocumentAsync({type: '*/*', multiple: false})
        if (result.type === 'success') {
            const type = getMediaType(result.name) ?? 'pdf'
            const res = await uploadFile(result.name, type, {uri: result.uri, name: result.name, type: `file/${type}`})
            if (res) {
                sendChatMessageSocketAction({files: [res.id], content: '', chat_id: id})
            }
            closeAttachModal()
        }
    }

    const uploadPhotoContainer = async (uri:string) => {
        return await uploadFile('photo.jpg', 'jpeg', {uri: uri, name: 'photo.jpg', type: `image/jpeg`})
    }

    const pickEndSendPhoto = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        }) as imagePickerResultType

        if (!result.cancelled) {
            const res = await uploadPhotoContainer(result.uri)
            if (res) {
                sendChatMessageSocketAction({media: [res.id], content: '', chat_id: id})
            }
            closeAttachModal()
        }
    }


    const sendPhotos = async (images: Array<string>) => {
        closeAttachModal()
        const arr = []
        for (const i of images) {
            arr.push(uploadPhotoContainer(i))
        }
        const res = await Promise.all(arr)
        if (res.length > 0) {
            sendChatMessageSocketAction({media: res.map((el) => el?.id ?? 0), content: '', chat_id: id})
        }
    }

    const onSendMessage = (text: string, type: 'text', file?: { name: string, uri: string }) => {
        sendChatMessageSocketAction({content: text, chat_id: id})
    }


    useLayoutEffect(() => {
        const chat = chats.find((el) => el.id === id)

        if (chat) {
            navigation.setOptions({
                headerTitle: () => (<ChatHeader
                    loadId={chat.load}
                    membersCount={chat.users.length}
                    avatar={getChatAvatar(chat.users) || ''}/>
                ),
                headerRight: () => (
                    <TouchableOpacity
                        style={{
                            width: 32,
                            alignItems: 'center',
                            height: '100%',
                            justifyContent: 'center',
                        }}>
                        <MoreSVG/>
                    </TouchableOpacity>),
            })
        }
    }, [])

    useEffect(() => {
        setIsNewMessageInChat(false)
        getChatData({id})
        setUnreadCount({id, count: 0})
        setIsInChat(true)
        return () => {
            setUnreadCount({id, count: 0})
        }
    }, [])

    useEffect(() => {
        if (dy > 20) {
            closeAttachModal()
        }
    }, [dy])


    return (
        <>
            <ScreenWrapper safeAreaStyle={{backgroundColor: '#fff'}} enableNavigateButtons={false}>
                <KeyboardAvoidingView
                    // @ts-ignore
                    behavior={Platform.OS == 'ios' ? 'padding' : null}
                    style={{flex: 1, backgroundColor: '#fff'}}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? headerHeight : 0}
                >
                    <View style={styles.container}>
                        <MessageArea id={id}/>
                        <InputContainer
                            sendMessage={onSendMessage}
                            openAttach={openAttachModal}
                        />

                    </View>
                </KeyboardAvoidingView>
            </ScreenWrapper>
            {isOpened ?
                <AttachModal
                    sendPhotos={sendPhotos}
                    animValue={value}
                    pickEndSendPhoto={pickEndSendPhoto}
                    getDocument={pickDocument}
                    closeModal={closeAttachModal}
                /> :
                null
            }

        </>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        // height: '100%',
        flex: 1,
    },
})
