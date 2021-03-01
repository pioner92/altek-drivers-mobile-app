import React from 'react'
import {StyleSheet, Text, TextInput, View} from 'react-native'
import {styleConfig} from '../../../../StyleConfig'
import {Button} from '../atoms/button'

type propsType = {
    leftButtonLabel: string
    rightButtonLabel: string
    onPressLeftButton: () => void
    onPressRightButton: () => void
    inputValue: string
    onChange: (text: string) => void
}

export const Header: React.FC<propsType> = ({leftButtonLabel, rightButtonLabel, onChange, onPressLeftButton, onPressRightButton, inputValue}) => {
    return (
        <View style={styles.container}>
            <Button color='#FF4869' onPress={onPressLeftButton} label={leftButtonLabel}/>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <View style={styles.contentHeaderInputWrapper}>
                    <TextInput value={inputValue} onChangeText={onChange} keyboardType='number-pad'
                        style={styles.input}/>
                    <Text style={styles.inputTitle}>total</Text>
                </View>
            </View>

            <Button color='#1672D4' onPress={onPressRightButton} label={rightButtonLabel}/>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#F9FAFF',
        width: '100%',
        height: 64,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        zIndex: 2,
    },
    input: {
        borderRadius: 5,
        padding: 3,
        borderColor: '#BEC6D8',
        backgroundColor: '#fff',
        borderWidth: 1,
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 18,
        height: 25,
        color: styleConfig.textColor.dark,
        fontFamily: 'IBMPlex-400',
        width: 60,
    },
    contentHeaderInputWrapper: {
        marginLeft: 30,
        flexDirection: 'row',
        width: 85,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    inputTitle: {
        fontSize: 10,
        lineHeight: 13,
        fontFamily: 'IBMPlex-400',
        color: styleConfig.textColor.dark,
    },
})
