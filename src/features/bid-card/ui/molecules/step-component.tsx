import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {StepCircle} from "../../../../ui/atoms/step-circle";

type StepComponent = {
    number: string,
    title: string,
    subTitle?: string
}

export const StepComponent: React.FC<StepComponent> = ({number, title, subTitle}) => {
    return (
        <View style={styles.stepRow}>
            <StepCircle>{number}</StepCircle>
            <View style={styles.content}>
                <View style={{position:"absolute",transform:[{translateY:-10}]}}>
                    <Text style={styles.city}>{title}</Text>
                    <Text style={styles.subTitle}>{subTitle}</Text>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({

    stepRow: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    city: {
        fontSize: 14,
        fontFamily: 'IBMPlex-500',
        marginLeft: 4,
        color: '#1F2934',
        letterSpacing: -0.01,
        lineHeight: 16,
        fontWeight: '500',
        fontStyle: 'normal'
    },
    subTitle: {
        color: '#798293',
        fontSize: 12,
        lineHeight: 16,
        marginLeft: 4,
        fontFamily:'IBMPlex-400',
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%'
    },
})
