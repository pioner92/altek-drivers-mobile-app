import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from "react-native";
import {ChatRow} from "../../src/chat/ChatRow";
import {chatUsersType, getChats} from "../../src/api/rest/chat/get-chats";
import {useStore} from "effector-react";
import {ScreenWrapper} from "../../src/ui/atoms/screen-wrapper/screen-wrapper";
import {navButtonIndex, setSelectedIndexNavButton} from "../../src/features/navigation/models/models";
import {getDb} from "../../utils/db";
import {USERID} from "../../utils/db/constants";
import {$chatsData, setIsAmInChat, setSelfId} from './models/models';
import {getChatAvatar} from "./lib/get-chat-avatar";


// export const findDispatcherFromArr =  (arr: chatUsersType,userId:string) => {
//     if (userId) {
//         let dispatcher = arr.find((el) => el.toString() !== userId && el.avatar)
//         if (dispatcher) {
//             return dispatcher
//         }
//     }
// }
//
// export const getChatAvatar = (arr:chatUsersType,selfId:string) => {
//     const dispatcher = findDispatcherFromArr(arr,selfId)
//     if(dispatcher) {
//         return dispatcher.avatar
//     }
// }


export const Chat = () => {
    const chats = useStore($chatsData)
    const [userId,setUserId] = useState('')

    // const findDispatcherFromArr =  (arr: chatUsersType) => {
    //     if (userId) {
    //         let dispatcher = arr.find((el) => el.toString() !== userId && el.avatar)
    //         if (dispatcher) {
    //             return dispatcher
    //         }
    //     }
    // }

    useEffect(() => {
        setIsAmInChat(true)
        setSelectedIndexNavButton(navButtonIndex.chat)
        getChats()

            return () => {setIsAmInChat(false)}
    }, [])

    useEffect(()=>{
        (async function getUserId(){
           const userId = await getDb(USERID)
            if(userId){
                setSelfId(+userId)
                setUserId(userId)
            }
        })()
    },[])


    return (
        <ScreenWrapper enableNavigateButtons={true}>
            <ScrollView
                style={styles.container}>
                <View >
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
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: '100%'
    }
})

