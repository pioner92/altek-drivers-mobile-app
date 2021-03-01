import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {InfoSVG} from '../../../../ui/atoms/icons'


type propsType = {
    onPress: () => void
}

export const Header: React.FC<propsType> = ({children, onPress}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>{children}</Text>
            <TouchableOpacity
                style={{paddingHorizontal: 27, paddingVertical: 16, alignItems: 'flex-end', justifyContent: 'center'}}
                onPress={onPress}>
                <InfoSVG/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#D4DEF1',
        // paddingVertical: 16,
        justifyContent: 'space-between',
        paddingLeft: 27,
        // paddingRight: 37,
        alignItems: 'center',
    },
    headerTitle: {
        color: '#106DD3',
        fontSize: 16,
        fontFamily: 'IBMPlex-600',
        lineHeight: 21,
    },
})
