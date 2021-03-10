import React from 'react'
import {StyleSheet, Text, View} from 'react-native'

type dayTitlesType = {
    daysName: string[]
}

export const DayTitles: React.FC<dayTitlesType> = ({daysName}) => {
    return (
        <View style={styles.container}>
            {daysName.map((el, index) => {
                return (
                    <View key={index} style={styles.wrapper}>
                        <Text style={styles.dayTitle}>{el}</Text>
                    </View>
                )
            })}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 10,
        height: 16,
    },
    wrapper: {
        width: 32,
        height: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dayTitle: {
        fontFamily: 'IBMPlex-500',
        fontWeight: '500',
        fontStyle: 'normal',
        color: '#BEC3CC',
        fontSize: 8,
        letterSpacing: 1.5,
        lineHeight: 16,
    },

})
