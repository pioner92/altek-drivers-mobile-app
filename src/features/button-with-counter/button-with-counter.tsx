import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useStore} from "effector-react";
import {$counterMinutes, $isStartedCounter} from "./models/models";

type propsType = {
    onPress: () => void
}

export const ButtonWithCounter: React.FC<propsType> = ({onPress}) => {

    const timerMinutes = useStore($counterMinutes)
    const isStartedTimer = useStore($isStartedCounter)

    const buttonStyle = {
        borderColor: isStartedTimer ? '#C0C0C0' : '#F95875'
    }
    const labelStyle = {
        color: isStartedTimer ? '#798293' : '#FF4869'
    }

    return (
        <TouchableOpacity disabled={isStartedTimer} onPress={onPress} style={[styles.container, buttonStyle]}>
            <Text style={[styles.label,labelStyle]}>Cancel Bid</Text>
            {isStartedTimer
                ? <Text style={styles.counter}>{timerMinutes}</Text>
                : <View style={{width: 40}}/>
            }
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 54,
        width: '100%',
        flexDirection: "row",
        borderColor: '#C0C0C0',
        borderWidth: 1,
        borderRadius: 24,
        justifyContent: "center",
        alignItems: "center"
    },
    label: {
        fontFamily: 'IBMPlex-600',
        color: '#798293',
        fontSize: 16,
        lineHeight: 21,
        marginLeft: 40
    },
    counter: {
        width: 40,
        fontSize: 12,
        fontFamily: 'IBMPlex-500',
        color: '#FF4869',
        lineHeight: 16,
        transform: [
            {translateX: 20},
        ]
    }
})
