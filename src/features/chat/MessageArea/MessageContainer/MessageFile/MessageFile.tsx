import React from 'react'
import {StyleSheet, Text, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

type propsType = {
    file?: { name: string, uri: string }
}

export const MessageFile: React.FC<propsType> = ({file}) => {

    // const openFile = () => {
    //     FileViewer.open(file)
    //         .then((d)=> console.log(d) )
    //         .catch((e)=> console.log('File open error', e) )
    //
    // }

    return (
        <TouchableOpacity style={styles.container}>
            <Icon name='file' size={50} color='#fff'/>
            <Text style={{color: '#fff'}}>{file?.name}</Text>
        </TouchableOpacity>
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
