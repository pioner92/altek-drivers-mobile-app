import React from 'react'
import {StyleSheet, View} from 'react-native'
import {FilterSVG} from '../../atoms/icons'

type propsType = {
    enableBadge?: boolean
}

export const FilterIcon: React.FC<propsType> = ({enableBadge = false}) => {
    return (
        <View style={styles.container}>
            <FilterSVG/>
            {enableBadge &&
            <View style={styles.badge}/>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 21,
        width: 18,
        flexDirection: 'row',
    },
    badge: {
        width: 7,
        height: 7,
        borderRadius: 50,
        backgroundColor: '#1672D4',
        transform: [
            {translateX: -4},
            {translateY: -3},
        ],
    },
})
