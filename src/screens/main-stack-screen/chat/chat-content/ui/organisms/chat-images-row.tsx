import {TouchableOpacity, View} from 'react-native'
import {MessageImage} from '../../../../../../features/chat/MessageArea/MessageContainer/MessageImage/MessageImage'
import {serverUrl} from '../../../../../../api/urls'
import React, {useState} from 'react'
import {mediaType} from '../../../../../../api/rest/chat/get-chat-data'
import {ImageModalView} from '../../features/image-modal-view/image-modal-view'

type propsType = {
    images: mediaType
}

export const ChatImagesRow: React.FC<propsType> = ({images}) => {
    const [isOpened, setIsOpened] = useState(false)

    const openImage = () => {
        setIsOpened(true)
    }

    const getImagesArr = () => {
        return images.map((el) => ({url: `${serverUrl}${el.path}`}))
    }

    return (
        <TouchableOpacity onPress={openImage} style={{flexDirection: 'row'}}>
            {
                images.map((el) => (
                    <View key={el.id} style={{marginHorizontal: 2}}>
                        <MessageImage source={`${serverUrl}${el.path}`}/>
                    </View>
                ))
            }
            <ImageModalView isOpened={isOpened} closeModal={() => setIsOpened(false)} images={getImagesArr()}/>
        </TouchableOpacity>
    )
}
