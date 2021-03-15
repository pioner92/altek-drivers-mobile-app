import React from 'react'
import {Image, PixelRatio, StyleSheet, View} from 'react-native'
import {Message} from './Message'
import {serverUrl} from '../../../../api/urls'
import {mediaType} from '../../../../api/rest/chat/get-chat-data'


type propsType = {
    files: mediaType
    isVisibleDateRow: boolean
    img: string
    text: string
    from: string
    bySelf: boolean
    position: string
    time: string
    type: 'text' | 'image' | 'file'
}

export const MessageContainer: React.FC<propsType> = React.memo( ({text, img, from, bySelf, position, time, files, isVisibleDateRow, type}) => {
    return (
        <>

            <View
                style={[styles.container, {alignSelf: bySelf ? 'flex-end' : 'flex-start'}]}>
                <View style={[styles.wrapper, {flexDirection: bySelf ? 'row' : 'row-reverse'}]}>
                    <Message
                        files={files}
                        time={time}
                        position={position}
                        bySelf={bySelf}
                        from={from}
                        type={type}
                        text={text}
                    />
                    <View>
                        {img ?
                            <Image
                                source={{uri: `${serverUrl}${img}`}}
                                style={styles.avatar}/> :
                            <View
                                style={[styles.avatar, {backgroundColor: '#f4f4f4'}]}
                            />
                        }
                    </View>
                </View>
            </View>
            {/* {isVisibleDateRow &&*/}
            {/*    <View style={styles.messagesDateRow}>*/}
            {/*        <View style={styles.messagesDateWrapper}>*/}
            {/*            <Text style={styles.messageDateRowTitle}>{time}</Text>*/}
            {/*        </View>*/}

            {/*    </View>*/}
            {/* }*/}
        </>
    )
})

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
        flexDirection: 'row',
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
    },
    wrapper: {
        alignItems: 'flex-end',
    },
    avatar: {
        width: PixelRatio.getPixelSizeForLayoutSize(15),
        height: PixelRatio.getPixelSizeForLayoutSize(15),
        borderRadius: 50,
        marginHorizontal: 6,
    },
    messagesDateRow: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 10,
    },
    messagesDateWrapper: {
        backgroundColor: '#DDEEFF',
        paddingHorizontal: 9,
        paddingVertical: 5,
        borderRadius: 10,
    },
    messageDateRowTitle: {
        color: '#3284D2',
        fontFamily: 'IBMPlex-600',
        fontSize: 10,
        lineHeight: 13,
    },
})
