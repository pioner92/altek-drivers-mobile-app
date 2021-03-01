import React from 'react'
import {Image, StyleSheet, Text, View} from 'react-native'
import {SvgComponent} from '../../../../../src/chat/SvgIcon'
import {styleConfig} from '../../../../../src/StyleConfig'
import {serverUrl} from '../../../../../src/api/urls'

type propsType = {
    loadId: number | null
    membersCount: number
    avatar: string
}

export const ChatHeader: React.FC<propsType> = ({loadId, membersCount, avatar}) => {
    return (
        <View style={styles.container}>
            {avatar && loadId ?
                <Image source={{uri: avatar.includes(serverUrl) ? avatar : serverUrl + avatar}}
                    style={{width: 34, height: 34, borderRadius: 50}}/> :
                <SvgComponent size={34}/>
            }
            <View style={styles.titleWrapper}>
                <Text style={[styles.title, styles.chatName]}>{loadId ? `Load #${loadId}` : 'Dispatcher chat'}</Text>
                <Text style={[styles.title, styles.membersCount]}>{membersCount} members</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 14,
        lineHeight: 18,
        color: styleConfig.textColor.dark,
    },
    chatName: {
        fontFamily: 'IBMPlex-500',
    },
    membersCount: {
        fontFamily: 'IBMPlex-400',
    },
    titleWrapper: {
        marginLeft: 8,
    },
})
