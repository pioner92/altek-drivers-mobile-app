import React from 'react'
import {StyleSheet, Text, TextInput, View, ViewStyle} from 'react-native'
import {styleConfig} from '../../../../../../src/StyleConfig'

type propsType = {
    label: string
    currentValue?: number
    description: string
    onChange: (text: string) => void
    inputValue: string
    currentEnable?: boolean
    wrapperStyle?: ViewStyle
}

export const Row: React.FC<propsType> = ({label, currentValue, description, onChange, inputValue, wrapperStyle, currentEnable = true}) => {
    return (
        <View style={styles.container}>
            <View style={[styles.labelWrapper, wrapperStyle]}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
            {currentEnable ?
                <Text style={styles.currentValue}>{currentValue?.toString()}</Text> :
                <View style={{flex: 4}}/>
            }
            <TextInput keyboardType='decimal-pad' value={inputValue} onChangeText={onChange} style={styles.input}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    labelWrapper: {
        flex: 1.5,
        justifyContent: 'flex-start',
    },
    label: {
        fontSize: 14,
        fontFamily: 'IBMPlex-400',
        lineHeight: 18,
        color: styleConfig.textColor.dark,
    },
    currentValue: {
        flex: 1,
        textAlign: 'left',
        fontSize: 14,
        lineHeight: 18,
        color: styleConfig.textColor.dark,
    },
    input: {
        flex: 1,
        fontSize: 14,
        fontFamily: 'IBMPlex-600',
        textAlign: 'left',
    },
    description: {
        color: '#7E7E7E',
        fontSize: 10,
        lineHeight: 13,
        fontFamily: 'IBMPlex-400',
    },
})
