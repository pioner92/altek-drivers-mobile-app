import React, {useState} from 'react'
import {StyleSheet, TextInput, View} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import {SendButton} from './SendButton'


type propsType = {
    openAttach: () => void
    sendMessage: (text: string, type: 'text') => void
}

export const InputContainer: React.FC<propsType> = ({openAttach, sendMessage}) => {
    const [inputValue, setInputValue] = useState('')

    const onChange = (text: string) => {
        setInputValue(text)
    }

    const onSend = () => {
        if (inputValue.trim()) {
            sendMessage(inputValue, 'text')
        }
        setInputValue('')
    }

    return (
        <View style={styles.container}>
            <Icon onPress={openAttach} name='paperclip' size={20} style={{marginBottom: 8}} color={'#4d4d4d'}/>
            <TextInput
                multiline
                value={inputValue}
                onChangeText={onChange}
                style={styles.input}
                placeholder='Message...'
                placeholderTextColor='#ccc'
            />
            <SendButton callback={onSend} inputValue={inputValue}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        bottom: 0,
        paddingHorizontal: 15,
        alignItems: 'flex-end',
        width: '100%',
        paddingBottom: 10,
        paddingTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
    },

    input: {
        width: '80%',
        borderWidth: 1,
        padding: 10,
        borderColor: '#EBEBEB',
        borderRadius: 10,
        fontFamily: 'IBMPlex-600',
        color: '#5B5B5B',
    },
})
