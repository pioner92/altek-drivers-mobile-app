import React from 'react'
import {KeyboardTypeOptions, StyleSheet, TextInput, View, ViewStyle} from 'react-native'
import {styleConfig} from '../../../StyleConfig'

type inputType = {
    onChange: (text: string) => void
    value: string
    type?: KeyboardTypeOptions
    placeholder: string
    style?: ViewStyle | [ViewStyle]
    editable?: boolean
}
export const Input: React.FC<inputType> = ({onChange, value, placeholder, style, editable = true, type = 'phone-pad'}) => {
    return (
        <View style={[styles.container, style]}>
            <TextInput
                editable={editable}
                keyboardType={type}
                onChangeText={onChange}
                value={value}
                style={styles.textInput}
                placeholderTextColor='#8E8E8E'
                placeholder={placeholder}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 18,
        width: '100%',
    },
    textInput: {
        paddingBottom: 5,
        borderBottomWidth: 0.5,
        borderColor: '#DDDEE1',
        fontSize: 14,
        fontFamily: 'IBMPlex-500',
        lineHeight: 18,
        color: styleConfig.textColor.dark,
    },
})


