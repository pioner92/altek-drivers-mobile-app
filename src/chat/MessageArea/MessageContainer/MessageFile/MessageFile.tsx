import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

type propsType = {
    file?: { name: string, uri: string }
}

export const MessageFile: React.FC<propsType> = ({file}) => {
    return (
        <View style={styles.container}>
            <Icon name='file' size={50} color='#fff'/>
            <Text style={{color: '#fff'}}>{file?.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingHorizontal: 5,
        width: '100%',
        alignItems: 'center',
    },
})
