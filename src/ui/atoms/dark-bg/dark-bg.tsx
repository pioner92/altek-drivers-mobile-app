import React from 'react'
import {StyleSheet, View} from 'react-native'

export const DarkBg: React.FC = ({children}) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        zIndex: 2,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
})
