import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from "react-native";
import {useNavigate} from "../../lib/hooks";
import {styleConfig} from "../../StyleConfig";

type propsType = {
    buttonTitle:string
    title:string
    link:string
}

export const SignUpOrLogInSubtitle: React.FC<propsType> = ({buttonTitle,title,link}) => {
    const navigator = useNavigate()

    const onClick = () => {
        navigator(link)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.createAccountTitle}>{title}</Text>
            <TouchableOpacity onPress={onClick} style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text style={styles.button}> {buttonTitle}</Text>
            </TouchableOpacity>
        </View>

    )
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 21,
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: 'center'
    },
    createAccountTitle: {
        color: styleConfig.textColor.dark,
        fontSize: 14,
    },
    button: {
        color: '#1672D4',
        fontSize: 14,
        fontFamily: 'IBMPlex-600',
        lineHeight: 16
    },
})
