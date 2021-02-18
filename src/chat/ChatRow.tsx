import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image, Dimensions} from "react-native";
import {SvgComponent} from './SvgIcon'
import {useNavigation} from '@react-navigation/native'
import {styleConfig} from "../StyleConfig";
import {serverUrl} from "../api/urls";
import links from '../../links.json'

const width = Dimensions.get("window").width

type propsType = {
    id: number
    time: string
    loadId: number | null
    avatar: string | null
    lastMessage: string | null,
    membersCount: number
    unread_count: number
}


export const ChatRow: React.FC<propsType> = ({
                                                 id, time, loadId, avatar = '',
                                                 lastMessage = '', unread_count
                                             }) => {

    const {navigate} = useNavigation()
    const onPress = () => {
        navigate(links.chatContent, {id})
    }

    const createChatName = () => {
        if (loadId) {
            return `Load #${loadId}`
        }
        return 'Dispatcher chat'
    }

    const lastMessageLengthValidate = () => {
        if (lastMessage && lastMessage.length > width / 10) {
            return '...'
        }
    }

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.container}>
            <View style={styles.titleWrapper}>
                {avatar
                    ? <Image style={{width: 45, height: 45, borderRadius: 50, marginHorizontal: 5}}
                             source={{uri: avatar.includes(serverUrl) ? avatar : serverUrl + avatar}}/>
                    : <SvgComponent/>
                }
                <View>
                    <Text style={styles.title}>{createChatName()}</Text>
                    <Text
                        style={styles.lastMessage}>{lastMessage?.slice(0, width / 10)}{lastMessageLengthValidate()}</Text>
                </View>
            </View>
            <View>
                <Text style={styles.timeValue}>{time}</Text>
                {unread_count > 0 &&
                <View style={styles.unreadCountWrapper}>
                    <Text style={styles.unreadCountText}>{unread_count}</Text>
                </View>
                }

            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 79,
        borderTopWidth: 0,
        borderBottomWidth: 1,
        borderColor: '#EBEBEB',
        paddingLeft: 10,
        paddingRight: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    titleWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        width: "90%"
    },
    title: {
        fontSize: 14,
        fontFamily: 'IBMPlex-500',
        lineHeight: 18,
        color: styleConfig.textColor.dark,
        marginLeft: 5
    },
    lastMessage: {
        fontSize: 12,
        color: styleConfig.textColor.dark,
        lineHeight: 16,
        marginTop: 4,
        marginLeft: 5
    },
    timeValue: {
        fontSize: 10,
        lineHeight: 13,
        fontFamily: 'IBMPlex-400',
        color: '#525252'
    },
    unreadCountWrapper: {
        height: 16,
        backgroundColor: '#DDEEFF',
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        marginTop: 6
    },
    unreadCountText: {
        fontSize: 10,
        fontFamily: "IBMPlex-600",
        color: "#3284D2"
    }
})
