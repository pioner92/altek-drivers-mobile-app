import {Dimensions, Image, Modal, View} from "react-native";
import {ImageViewer} from "react-native-image-zoom-viewer";
import React from "react";

const width = Dimensions.get("window").width


type propsType = {
    isOpened: boolean
    closeModal: () => void
    images: Array<{ url: string }>
}

export const ImageModalView: React.FC<propsType> = ({isOpened, closeModal, images}) => {

    return (
        <Modal visible={isOpened} transparent={true}>
            <ImageViewer
                renderImage={(data) => {
                    return (
                        <View style={{alignItems: "center", justifyContent: "center"}}>
                            <Image style={{width: 0}} width={width - 16} height={width} resizeMode={"contain"}
                                   borderRadius={4} source={{uri: data.source.uri}}/>
                        </View>
                    )
                }}
                saveToLocalByLongPress={true}

                backgroundColor={"rgb(15,15,15)"}
                enableSwipeDown={true}
                onSwipeDown={closeModal}
                imageUrls={images}/>
        </Modal>
    )
}