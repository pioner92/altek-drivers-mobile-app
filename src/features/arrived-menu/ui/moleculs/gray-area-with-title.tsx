import React from 'react'
import {StyleSheet, View, ViewStyle} from 'react-native'
import {GrayTitle} from '../atoms/gray-title'
import {GrayArea} from '../atoms/gray-area'

type propsType = {
    title: string,
    style?: ViewStyle
}

export const GrayAreaWithTitle: React.FC<propsType> = ({children, title, style}) => {
    return (
        <View style={[styles.container, style]}>
            <GrayTitle title={title}/>
            <GrayArea>
                {children}
            </GrayArea>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 70,
        justifyContent: 'space-between',
    },
})
