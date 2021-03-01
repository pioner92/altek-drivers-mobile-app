import React from 'react'
import {StyleSheet, Text, View} from 'react-native'

import {CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell} from 'react-native-confirmation-code-field'

type numberFieldsType = {
    value: string
    setValue: (text: string) => void
}


export const NumberFields: React.FC<numberFieldsType> = ({value, setValue}) => {
    const ref = useBlurOnFulfill({value, cellCount: 4})

    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    })
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <CodeField
                    ref={ref}
                    value={value}
                    onChangeText={setValue}
                    cellCount={4}
                    rootStyle={styles.codeFieldRoot}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    renderCell={({index, symbol, isFocused}) => (
                        <View
                            key={index}
                            style={styles.ceilWrapper}>
                            <Text
                                style={[styles.cell, isFocused && styles.focusCell]}
                                onLayout={getCellOnLayoutHandler(index)}>
                                {symbol || (isFocused ? <Cursor/> : null)}
                            </Text>
                        </View>
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 31,
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    codeFieldRoot: {
        // marginTop: 20,
        width: '100%',
        justifyContent: 'space-between',
    },
    cell: {
        width: 54,
        height: 60,
        color: '#18284B',
        lineHeight: 60,
        fontFamily: 'IBMPlex-500',
        fontSize: 18,
        borderRadius: 5,
        // borderWidth:2,
        // backgroundColor:'#E1E1E1',
        textAlign: 'center',
    },
    focusCell: {
        borderColor: '#000',
    },
    ceilWrapper: {
        backgroundColor: '#E1E1E1',
        borderRadius: 5,
    },
})
