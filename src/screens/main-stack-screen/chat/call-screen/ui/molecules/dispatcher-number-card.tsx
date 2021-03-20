import {WhiteCard} from '../../../../../../ui/atoms/card/white-card'
import React from 'react'
import {Image, StyleSheet, Text, View} from 'react-native'
import {styleConfig} from '../../../../../../StyleConfig'


type propsType = {
    name: string
    departament: string
    extension: string
    avatar: string
}

export const DispatcherNumberCard: React.FC<propsType> = ({name, departament, extension, avatar}) => {
    return (
        <WhiteCard style={styles.card}>
            <View style={styles.wrapper}>
                {avatar ?
                    <Image style={styles.avatar} source={{uri: avatar}}/>
                    : <View style={[styles.avatar, {backgroundColor: '#eeeeee'}]}/>
                }
                <View style={styles.textWrapper}>
                    <View style={styles.titleWrapper}>
                        <Text style={styles.name}>{name}</Text>
                        <View style={styles.departamentWrapper}>
                            <Text style={styles.departamentText}>{departament}</Text>
                        </View>
                    </View>
                    <Text style={styles.extension}>extension #{extension}</Text>
                </View>
            </View>
        </WhiteCard>
    )
}

const styles = StyleSheet.create({
    card: {
        shadowRadius: 1,
        paddingHorizontal: 12,
        marginTop: 20,
        paddingVertical: 10,
    },
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textWrapper: {
        flex: 1,
    },
    departamentWrapper: {
        height: 13,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 4,
        backgroundColor: '#1672D4',
        paddingHorizontal: 4,
        borderRadius: 5,
    },
    departamentText: {
        color: '#fff',
        fontFamily: 'IBMPlex-500',
        fontSize: 10,
        lineHeight: 13,
    },
    name: {
        fontFamily: 'IBMPlex-500',
        fontSize: 14,
        lineHeight: 18,
        color: '#000',
    },
    extension: {
        fontFamily: 'IBMPlex-400',
        fontSize: 14,
        lineHeight: 18,
        marginTop: 2,
        color: styleConfig.textColor.dark,
    },
    avatar: {
        width: 38,
        height: 38,
        borderRadius: 100,
        marginRight: 5,
    },
})
