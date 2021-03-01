import React from 'react'
import {StyleSheet, View} from 'react-native'
import {MessageText} from './MessageText/MessageText'
import {MessageFile} from './MessageFile/MessageFile'
import {MessageHeader} from './MessageHeader/MessageHeader'
import {MessageTime} from './MessageTime/MessageTime'
import {mediaType} from '../../../api/rest/chat/get-chat-data'
import {styleConfig} from '../../../StyleConfig'
import {ChatImagesRow} from '../../../../screens/chat/chat-content/ui/organisms/chat-images-row'


type propsType = {
    files: mediaType
    text: string
    type: 'text' | 'file' | 'image'
    file?: { name: string, uri: string }
    from: string
    bySelf: boolean
    position: string
    time: string
}

export const Message: React.FC<propsType> = ({text, type, file, from, bySelf: bySelf, position, time, files}) => {
    const styleContainer = bySelf ?
        {
            backgroundColor: '#1672D4',
            borderBottomLeftRadius: 20,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
        } :
        {
            backgroundColor: '#F4F4F4',
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            borderTopLeftRadius: 20,
        }
    const styleText = bySelf ? {color: '#fff'} : {color: styleConfig.textColor.dark}

    const typeIsNotImage = () => {
        return type !== 'image'
    }


    return (
        <View style={[styles.container, typeIsNotImage() ? styleContainer : {
            paddingHorizontal: 0,
            paddingTop: 0,
            paddingBottom: 0,
        }]}>
            {typeIsNotImage() ?
                <MessageHeader bySelf={bySelf} from={from} position={position}/> :
                null
            }

            {type === 'text' && <MessageText bySelf={bySelf} style={styleText}>{text}</MessageText>}
            {type === 'image' && <ChatImagesRow images={files}/>}
            {type === 'file' && <MessageFile file={file!}/>}

            <View style={typeIsNotImage() ? null : styles.imageTime}>
                <MessageTime isImage={!typeIsNotImage()} bySelf={bySelf} time={time}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 10,
    },
    text: {
        fontSize: 14,
        lineHeight: 18,
        fontFamily: 'IBMPlex-400',
    },
    imageTime: {
        backgroundColor: '#7E7E7E',
        borderRadius: 4,
        width: 31,
        height: 14,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        right: 9,
        bottom: 2,
    },
})
