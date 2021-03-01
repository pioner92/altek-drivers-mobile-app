import React, {useState} from 'react'
import {Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import {useSpring} from '../../utils/animation-hooks/Hooks'
import {useStore} from 'effector-react'
import {selectedBidStore, setIsStartedIntervalEvent, setSentBidIdEvent, timer} from '../../Store/Store'
import {sendBid} from '../api/rest/bid/send-bid'


export const PlaceBidMenu = ({value, closeModal}: any) => {
    const selectedBidId = useStore(selectedBidStore)

    const [inputValue, setInputValue] = useState(0)


    const openPicker = () => {
        useSpring(value, 1, 10, 5, false).start()
    }

    const onPlaceBid = () => {
        Keyboard.dismiss()
        if (selectedBidId) {
            sendBid({load: selectedBidId, price: inputValue})
                .then((data) => {
                    closeModal()
                    setInputValue(0)
                    if (data?.success) {
                        setSentBidIdEvent({loadId: selectedBidId, bid_id: data.bid})
                        setIsStartedIntervalEvent(true)
                        timer(setIsStartedIntervalEvent)
                    }
                })
        }
    }

    const onCancel = () => {
        setInputValue(0)
        closeModal()
    }

    const onChangeInput = (text: string) => {
        setInputValue(+text)
    }


    return (
        <View style={styles.container}>
            <View style={[styles.wrapper]}>
                <View style={styles.content}>
                    <ButtonComponent callback={onCancel} title='Cancel'/>
                    <View>
                        <TextInput
                            keyboardType={'numeric'}
                            onFocus={openPicker}
                            value={inputValue.toString()}
                            onChangeText={onChangeInput}
                            style={styles.textInput}/>
                    </View>
                    <ButtonComponent callback={onPlaceBid} title='Place'/>
                </View>
            </View>
        </View>
    )
}

type buttonComponentType = {
    callback: () => void
    title: string
}

const ButtonComponent: React.FC<buttonComponentType> = ({callback, title}) => {
    return (
        <View>
            <TouchableOpacity onPress={callback}>
                <Text style={styles.textButton}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        width: '100%',
    },
    wrapper: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
    },
    content: {
        backgroundColor: '#F9FAFF',
        bottom: 0,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 21,
        paddingHorizontal: 29,
    },
    textInput: {
        textAlign: 'center',
        borderWidth: 1,
        width: 80,
        height: 24,
        borderRadius: 3,
        backgroundColor: '#FFFFFF',
        borderColor: '#BEC6D8',
        paddingHorizontal: 23,
        color: '#102656',
        fontSize: 14,
        lineHeight: 18,
    },
    textButton: {
        fontSize: 14,
        fontFamily: 'IBMPlex-600',
        lineHeight: 18,
        color: '#1067C5',
    },
})

