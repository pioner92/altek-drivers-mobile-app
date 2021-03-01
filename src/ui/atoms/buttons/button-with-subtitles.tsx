import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Button, buttonPropsType, buttonThemes} from './button'

type propsType = {
    buttonTitle: string
    theme?: buttonThemes
}

export const ButtonWithSubtitles: React.FC<buttonPropsType & propsType> = ({onPress, disabled = false, buttonTitle, children, theme}) => {
    return (
        <View style={styles.container}>
            <Button onPress={onPress} theme={theme} disabled={disabled}>{buttonTitle}</Button>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {},
})
