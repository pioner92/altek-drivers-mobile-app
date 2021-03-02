import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {TakenPicture} from '../../../../../../../src/ui/molecules/taken-pickture'

type propsType = {
    callbackLeft: () => void
    callbackRight: () => void
}

export const TakenPictureRow: React.FC<propsType> = ({callbackLeft, callbackRight}) => {
    return (
        <View style={styles.container}>
            <View style={{flex: 1, alignItems: 'center'}}>
                <TakenPicture callback={callbackLeft}>Picture taken</TakenPicture>
                <Text style={styles.title}>BOL picture</Text>
            </View>
            <View style={styles.space}></View>
            <View style={{alignItems: 'center', flex: 1}}>
                <TakenPicture callback={callbackRight}>Picture taken</TakenPicture>
                <Text style={styles.title}>Fright picture</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        flex: 1,
    },
    space: {
        width: 23,
    },
    title: {
        color: '#798293',
        fontFamily: 'IBMPlex-500',
        marginTop: 10,
        fontSize: 12,
        lineHeight: 16,
    },
})
