import React, {useEffect, useLayoutEffect, useState} from 'react'
import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import {InputContainer} from '../../../../features/chat/InputContent/InputContainer'
import {AttachMenu} from '../../../../features/chat/AttachMenu/AttachMenu'
import {MessageArea} from '../../../../features/chat/MessageArea/MessageArea'
import {getChatData} from '../../../../api/rest/chat/get-chat-data'
import {StackScreenProps, useHeaderHeight} from '@react-navigation/stack'
import {$chatsData, setIsInChat, setIsNewMessageInChat, setUnreadCount} from '../models/models'
import {sendChatMessageSocketAction} from '../../../../api/socket-client/socket-actions/socket-actions'
import {ChatHeader} from './ui/moleculs/chat-header'
import {useStore} from 'effector-react'
import {$swipeMenuWrapperValueDY} from '../../../../features/swipe-menu-wrapper/models/models'
import {ScreenWrapper} from '../../../../ui/atoms/screen-wrapper/screen-wrapper'
import {getChatAvatar} from '../lib/get-chat-avatar'
import * as DocumentPicker from 'expo-document-picker'
import {
    $animValueAttachMenu,
    $isMountedAttachMenu,
    hideAttachMenu,
    showAttachMenu,
} from '../../../../features/chat/AttachMenu/models/models'
import {uploadPhotoContainer} from './lib/uploadPhotoContainer'
import {ChatContext} from './context'
import {uploadFileChat} from '../../../../api/rest/upload-chat-files'
import {HeaderRightChatContent} from './features/header-right-chat-content/header-right-chat-content'
import {links} from '../../../../navigation/links'
import {chatUsersType} from '../../../../api/rest/chat/get-chats'
import {$userData} from '../../profile/models/models'
import {ProgressIndicator} from './features/progreess-indicator/progress-indicator'

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


export const ChatContent: React.FC<StackScreenProps<{ item: chatContentPropsType }>> = React.memo(({route, navigation}) => {
    const params = route.params as chatContentPropsType

    const {id} = params
    const dy = useStore($swipeMenuWrapperValueDY)
    const isMounted = useStore($isMountedAttachMenu)
    const chats = useStore($chatsData)
    const currentUser = useStore($userData)
    const headerHeight = useHeaderHeight()
    const [progress, setProgress] = useState(0)
    const [isVisibleProgressIndicator, setIsVisibleProgressIndicator] = useState(false)

    const value = useStore($animValueAttachMenu)

    const openAttachMenu = () => {
        showAttachMenu()
    }

    const closeAttachMenu = () => {
        hideAttachMenu()
    }

    const getMediaType = (media: string) => {
        return media.match(/\.([a-z]+)/)?.[1]
    }

    const hideProgressIndicator = () => {
        setIsVisibleProgressIndicator(false)
        setProgress(0)
    }

    const pickDocument = async () => {
        const result = await DocumentPicker.getDocumentAsync({type: '*/*', multiple: false})
        if (result.type === 'success') {
            const type = getMediaType(result.name) ?? 'pdf'

            closeAttachMenu()
            setIsVisibleProgressIndicator(true)

            const res = await uploadFileChat(result.name, type, {
                uri: result.uri,
                name: result.name,
                type: `file/${type}`,
            }, setProgress)
            hideProgressIndicator()
            if (res) {
                sendChatMessageSocketAction({files: [res.id], content: '', chat_id: id})
            }
        }
    }

    const pickEndSendPhoto = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        }) as imagePickerResultType

        if (!result.cancelled) {
            closeAttachMenu()
            setIsVisibleProgressIndicator(true)
            const res = await uploadPhotoContainer(result.uri, setProgress)
            hideProgressIndicator()
            if (res) {
                sendChatMessageSocketAction({media: [res.id], content: '', chat_id: id})
            }
        }
    }


    const sendPhotos = async (images: Array<string>) => {
        closeAttachMenu()
        const arr = []
        for (const i of images) {
            arr.push(uploadPhotoContainer(i))
        }
        const res = await Promise.all(arr)
        if (res.length > 0) {
            sendChatMessageSocketAction({media: res.map((el) => el?.id ?? 0), content: '', chat_id: id})
        }
    }

    const onSendMessage = (text: string) => {
        sendChatMessageSocketAction({content: text, chat_id: id})
    }

    const onPressPhone = (users?: chatUsersType) => {
        // @ts-ignore
        navigation.navigate(links.callScreen, {users, companyPhone: currentUser?.company_info.company_phone})
    }

    useLayoutEffect(() => {
        const chat = chats.find((el) => el.id === id)
        const dispatchers = chat?.users.filter((el) => el.id !== currentUser.id && el.department !== 'Driver')

        if (chat) {
            navigation.setOptions({
                headerTitle: () => (<ChatHeader
                        loadId={chat.load}
                        membersCount={chat.users.length}
                        avatar={getChatAvatar(chat.users) || ''}/>
                ),
                headerRight: () => (<HeaderRightChatContent onPressPhone={() => onPressPhone(dispatchers)}/>),
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
            closeAttachMenu()
        }
    }, [dy])


    return (
        <>
            <ChatContext.Provider value={{chatId: id}}>
                <ScreenWrapper safeAreaStyle={{backgroundColor: '#fff'}}>
                    <KeyboardAvoidingView
                        // @ts-ignore
                        behavior={Platform.OS == 'ios' ? 'padding' : null}
                        style={{flex: 1, backgroundColor: '#fff'}}
                        keyboardVerticalOffset={Platform.OS === 'ios' ? headerHeight : 0}
                    >
                        <View style={styles.container}>
                            <MessageArea id={id}/>
                            <ProgressIndicator
                                style={styles.progressIndicatorContainer}
                                hidden={!isVisibleProgressIndicator}
                                progressState={progress}/>
                            <InputContainer
                                sendMessage={onSendMessage}
                                openAttach={openAttachMenu}
                            />
                        </View>
                    </KeyboardAvoidingView>
                </ScreenWrapper>
                {isMounted ?
                    <AttachMenu
                        sendPhotos={sendPhotos}
                        animValue={value}
                        pickEndSendPhoto={pickEndSendPhoto}
                        getDocument={pickDocument}
                        closeModal={closeAttachMenu}
                    /> :
                    null
                }
            </ChatContext.Provider>
        </>
    )
})


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    progressIndicatorContainer:{
        bottom: 50,
        backgroundColor: '#F9F9FB',
        height: 37,
        justifyContent: 'center',
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
    },
})
