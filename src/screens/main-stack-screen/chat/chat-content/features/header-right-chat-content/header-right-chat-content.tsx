import {StyleSheet, TouchableOpacity, View} from 'react-native'
import {MoreSVG} from '../../../../../../ui/atoms/icons/more-svg'
import {PhoneSVG} from '../../../../../../ui/atoms/icons/phone-svg'
import React from 'react'


type propsType = {
    onPressPhone?:()=>void
    onPressMore?:()=>void
}

export const HeaderRightChatContent:React.FC<propsType> = ({onPressPhone, onPressMore}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPressPhone} style={styles.button}>
                <PhoneSVG/>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressMore} style={styles.button}>
                <MoreSVG/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    button: {
        marginHorizontal: 10,
    },
})
