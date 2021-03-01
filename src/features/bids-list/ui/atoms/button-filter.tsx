import React from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
import {FilterSVG} from '../../../../ui/atoms/icons'

type propsType = {
    callback: () => void
}

export const ButtonFilter: React.FC<propsType> = ({callback}) => {
    return (
        <TouchableOpacity onPress={callback} style={styles.container}>
            <FilterSVG/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {},
})
