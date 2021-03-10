import React, {useState} from 'react'
import {Animated, Text, TouchableOpacity, View} from 'react-native'
import {styleConfig} from '../../../StyleConfig'
import {GallerySVG} from '../../../ui/atoms/icons/gallery-svg'
import {FilesSVG} from '../../../ui/atoms/icons/files-svg'
import {LocationFillSVG} from '../../../ui/atoms/icons/location-fill-svg'
import {SwipeMenuWrapper} from '../../swipe-menu-wrapper'
import {ImagePickerRoll} from '../../../screens/main-stack-screen/chat/features/image-picker-roll/image-picker-roll'
import {Button} from '../../../ui/atoms/buttons'


type callback = () => void

type propsType = {
    closeModal: callback
    getDocument: callback
    pickEndSendPhoto: callback
    sendPhotos: (images: Array<string>) => void
    animValue: Animated.Value
}

export const AttachModal: React.FC<propsType> = ({closeModal, getDocument, pickEndSendPhoto, animValue, sendPhotos}) => {
    const [selectedImage, setSelectedImage] = useState<Array<string>>([])

    const selectedImageHandler = (uri: Array<string>) => {
        setSelectedImage(uri)
    }

    const closeModalHandler = () => {
        closeModal()
        setSelectedImage([])
    }
    const sendPhotosHandler = () => {
        sendPhotos(selectedImage)
    }


    return (
        <SwipeMenuWrapper style={{height: selectedImage.length === 0 ? 299 : 369, paddingHorizontal: 14}}
            value={animValue}>
            <ImagePickerRoll onSelect={selectedImageHandler}/>
            <View style={{
                marginTop: 'auto',
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'flex-start',
                paddingTop: 10,
            }}>
                {selectedImage.length === 0 ?
                    <View style={{width: 172, flexDirection: 'row', justifyContent: 'space-between', marginLeft: 25}}>
                        <AttachItemWithIcon Icon={GallerySVG} title='Gallery' onPress={pickEndSendPhoto}/>
                        <AttachItemWithIcon Icon={FilesSVG} title='File' onPress={getDocument}/>
                        <AttachItemWithIcon Icon={LocationFillSVG} title='Location' onPress={getDocument}/>
                    </View> :
                    <View style={{width: '100%', height: 118, justifyContent: 'space-between'}}>
                        <Button onPress={sendPhotosHandler}>Send photo (s)</Button>
                        <Button theme='white' onPress={closeModalHandler}>Close</Button>
                    </View>
                }
            </View>
            <View style={{backgroundColor: '#FEFEFE', height: 30, width: '100%'}}/>
        </SwipeMenuWrapper>
    )
}


type attachItemType = {
    title: string
    Icon: React.FC
    onPress: () => void
}

const AttachItemWithIcon: React.FC<attachItemType> = ({title, Icon, onPress}) => {
    return (
        <TouchableOpacity
            style={{marginTop: 'auto', alignItems: 'center'}}
            onPress={onPress}>
            <View style={{
                width: 40,
                height: 40,
                borderRadius: 50,
                backgroundColor: '#1672D4',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Icon/>
            </View>
            <Text style={{fontSize: 12, lineHeight: 16, fontFamily: 'IBMPlex-500', color: styleConfig.textColor.dark}}
            >{title}</Text>
        </TouchableOpacity>
    )
}

