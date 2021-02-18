import React from 'react';
import {StyleSheet, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {SendMessageBtnSVG} from "../../ui/atoms/icons/send-message-btn-svg";


type propsType = {
    inputValue: string
    callback:()=>void
}

export const SendButton: React.FC<propsType> = ({inputValue,callback}) => {
    return (
        <TouchableOpacity onPress={callback} style={styles.container}>
            {!inputValue ?
                <View style={styles.sendWrapper}>
                    <Icon name='microphone' size={20} color={'#4d4d4d'}/>
                </View>
                : <View style={styles.sendWrapper}>
                    {/*<Icon name='paper-plane' size={20} color={'#1672D4'}/>*/}
                    <SendMessageBtnSVG/>
                </View>
            }
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingBottom:8
    },
    sendWrapper: {
        width: 30
    },
})
