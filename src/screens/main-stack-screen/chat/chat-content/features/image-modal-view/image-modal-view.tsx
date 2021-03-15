import React from 'react'
import ImageView from 'react-native-image-viewing'


type propsType = {
    isOpened: boolean
    closeModal: () => void
    images: Array<{ uri: string }>
}

export const ImageModalView: React.FC<propsType> = ({isOpened, closeModal, images}) => {
    return (
        <ImageView
            images={images}
            imageIndex={0}
            visible={isOpened}
            onRequestClose={closeModal}
        />
    )
}
