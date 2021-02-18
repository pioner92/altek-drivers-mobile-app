import React, {useEffect, useState} from "react";
import {FlatList, View} from "react-native";
import {ImageView} from "../ui/molecules/image-view";
import {Asset} from "expo-media-library/src/MediaLibrary";
import * as MediaLibrary from "expo-media-library";

type propsType = {
    // images: Array<Asset>
    onSelect: (uri: Array<string>) => void
}

export const ImagePickerRoll: React.FC<propsType> = ({onSelect}) => {

    const [selectedImages, setSelectedImages] = useState<Array<string>>([])
    const [assets, setAssets] = useState<Array<Asset>>([])
    const [endCursor, setEndCursor] = useState<string | undefined>(undefined)

    const onPressHandler = (uri: string) => {
        selectImageHandler(uri)

    }

    const selectImageHandler = (uri: string) => {
        if (selectedImages.includes(uri)) {
            setSelectedImages(selectedImages.filter(el => el !== uri))
        } else {
            setSelectedImages([...selectedImages, uri])
        }
    }


    const onNextPage = async () => {
        const media = await MediaLibrary.getAssetsAsync({
            after: endCursor,
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
                    first: 20
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
            columnWrapperStyle={{justifyContent: "space-between"}}
            numColumns={3}
            ItemSeparatorComponent={
                () => <View style={{backgroundColor: 'transparent',height:6 }}/>
            }
            onEndReached={onNextPage}
            onEndReachedThreshold={0}
            data={assets}
            keyExtractor={(el) => el.id}
            renderItem={({item}) =>
                <ImageView
                    isSelected={selectedImages.includes(item.uri)}
                    uri={item.uri}
                    onPress={onPressHandler}
                />}
        />
    )
}
