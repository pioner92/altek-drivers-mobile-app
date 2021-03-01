import React from 'react'
import {StyleSheet, Text, View} from 'react-native'

type InfoType = {
    value1: string
    value2: string
    value3: string
    value4: string
}

export const Info: React.FC<InfoType> = ({value1, value2, value3, value4}) => {
    return (
        <View style={styles.info}>
            <View style={{alignItems: 'flex-end', flex: 1}}>
                <Text style={styles.infoTitle}>{value1}</Text>
                <Text style={styles.infoTitle}> {value2}</Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
                <Text style={styles.infoTitle}>{value3}</Text>
                <Text style={styles.infoTitle}>{value4}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    info: {
        alignItems: 'flex-end',
        flexDirection: 'column',
    },
    infoTitle: {
        color: '#798293',
        fontSize: 12,
        letterSpacing: -0.01,
        fontFamily: 'IBMPlex-400',
        fontWeight: 'normal',
        lineHeight: 16,
    },
})
