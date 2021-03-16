import React, {useContext, useEffect, useState} from 'react'
import {Dimensions, FlatList, StyleSheet, TouchableOpacity, View} from 'react-native'
import {Asset} from 'expo-media-library/src/MediaLibrary'
import * as MediaLibrary from 'expo-media-library'
import {CameraSVG} from '../../../../../ui/atoms/icons'
import {ImageView} from '../ui/molecules/image-view'
import {useNavigate} from '../../../../../lib/hooks'
import {sendChatMessageSocketAction} from '../../../../../api/socket-client/socket-actions/socket-actions'
import {ChatContext} from '../../chat-content/chat-content'
import {hideAttachMenu} from '../../../../../features/chat/AttachMenu/models/models'
import {links} from '../../../../../navigation/links'
import {uploadPhotoContainer} from '../../chat-content/lib/uploadPhotoContainer'

type propsType = {
    // images: Array<Asset>
    onSelect: (uri: Array<string>) => void
}

const width = Dimensions.get('window').width


export const ImagePickerRoll: React.FC<propsType> = ({onSelect}) => {
    const [selectedImages, setSelectedImages] = useState<Array<string>>([])
    const [assets, setAssets] = useState<Array<Asset>>([])
    const [endCursor, setEndCursor] = useState<string | undefined>(undefined)

    const onPressHandler = (uri: string) => {
        selectImageHandler(uri)
    }

    const selectImageHandler = (uri: string) => {
        if (selectedImages.includes(uri)) {
            setSelectedImages(selectedImages.filter((el) => el !== uri))
        } else {
            setSelectedImages([...selectedImages, uri])
        }
    }


    const onNextPage = async () => {
        const media = await MediaLibrary.getAssetsAsync(
            {
                after: endCursor,
                sortBy: 'creationTime',

            })
        if (media.assets) {
            setAssets([...assets, ...media.assets])
        }
        setEndCursor(media.endCursor)
    }

    useEffect(() => {
        (async function f() {
            const {granted} = await MediaLibrary.requestPermissionsAsync()
            if (granted) {
                const media = await MediaLibrary.getAssetsAsync({
                    first: 20,
                    sortBy: 'creationTime',
                })
                if (media.assets) {
                    setAssets(media.assets)
                    setEndCursor(media.endCursor)
                }
            }
        })()
    }, [])

    useEffect(() => {
        if (selectedImages.length > 0) {
            onSelect([...selectedImages])
        } else {
            onSelect([])
        }
    }, [selectedImages])


    return (
        <FlatList
            showsVerticalScrollIndicator={false}
            style={{height: 196}}
            initialScrollIndex={0}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            numColumns={3}
            ItemSeparatorComponent={
                () => <View style={{backgroundColor: 'transparent', height: 6}}/>
            }
            onEndReached={onNextPage}
            onEndReachedThreshold={0}
            data={assets}
            keyExtractor={(el) => el.id}
            renderItem={({item, index}) =>
                (index === 0 ?
                    <OpenCameraButton/>
                    :
                    <ImageView
                        isSelected={selectedImages.includes(item.uri)}
                        uri={item.uri}
                        onPress={onPressHandler}
                    />
                )
            }
        />
    )
}

const OpenCameraButton = () => {
    const chatContextValue = useContext(ChatContext)

    const navigate = useNavigate()
    const callback = async (uri: string) => {
        const res = await uploadPhotoContainer(uri)
        hideAttachMenu()
        if (res) {
            sendChatMessageSocketAction({media: [res.id], content: '', chat_id: chatContextValue.chatId})
        }
    }

    const onPress = () => {
        navigate(links.camera, {callback})
    }

    return (
        <TouchableOpacity onPress={onPress} style={styles.openCameraButton}>
            <CameraSVG color='#fff'/>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    openCameraButton: {
        width: (width / 100) * 30.5,
        height: 100,
        backgroundColor: '#C4C4C4',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
