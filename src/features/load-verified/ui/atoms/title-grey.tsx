import React from 'react'
import {FlexStyle, StyleSheet} from 'react-native'
import {VerifiedScreenTitle} from '../../../../ui/atoms/title'

type propsType = {
    style?: FlexStyle
}

export const TitleGrey: React.FC<propsType> = ({children, style}) => {
    return (
        <VerifiedScreenTitle style={[styles.text, style]} color={'#798293'}>{children}</VerifiedScreenTitle>
    )
}

const styles = StyleSheet.create({
    text: {
        marginBottom: 10,
    },
})
