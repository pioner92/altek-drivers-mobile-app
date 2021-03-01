import {Dimensions, Image, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {SelectedCircle} from './selected-circle'

const width = Dimensions.get('window').width

type propsType = {
    onPress: (uri: string) => void
    uri: string
    isSelected: boolean
}

export const ImageView: React.FC<propsType> = ({onPress, uri, isSelected}) => {
    const onPressHandler = () => {
        onPress(uri)
    }

    return (
        <TouchableOpacity style={{width: '32.5%'}} onPress={onPressHandler} activeOpacity={0.9}>
            <Image style={{width: 1, height: 1, borderRadius: 2}}
                resizeMode={'cover'}
                height={100}
                width={(width / 100) * 30.5}
                source={{uri}}/>

            <View style={{position: 'absolute', right: 10, top: 10}}>
                <SelectedCircle isSelected={isSelected}/>
            </View>

        </TouchableOpacity>
    )
}

