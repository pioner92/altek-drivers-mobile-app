import React from 'react'
import {loadHistoryCardTheme} from '../../../../lib/load-history-card-theme'
import {StyleSheet, Text, View, ViewStyle} from 'react-native'

type propsTypeHeader = {
    style: ViewStyle
    status: 'pending' | 'completed'
}

export const TotalRateCardHeader: React.FC<propsTypeHeader> = ({children, style, status}) => {
    const {backgroundColor, color} = loadHistoryCardTheme(status)

    return (
        <View style={[styles.container, {backgroundColor}, style]}>
            <Text style={[styles.headerTitle, {color}]}>{children}</Text>
        </View>
    )
}


const styles = StyleSheet.create({

    container: {
        height: 38,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 16,
        lineHeight: 21,
        fontFamily: 'IBMPlex-600',
    },

})
