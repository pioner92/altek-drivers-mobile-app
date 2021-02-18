import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Text, TouchableOpacity} from "react-native";

export type valueType = {
    id: number
    value: number
}

type propsType = {
    values: Array<valueType>
    onSelect: (e: valueType) => void
}

export const ScrollArea: React.FC<propsType> = ({values, onSelect}) => {

    const [selectedIndex, setSelectedIndex] = useState(1)

    const onPress = (el: valueType) => {
        setSelectedIndex(el.id)
        onSelect(el)
    }

    return (
        <ScrollView keyboardDismissMode="on-drag"
                    nestedScrollEnabled={true}
                    style={styles.container}>
            <View style={styles.valuesWrapper}>
                {values.map((el) => {
                    return (
                        <TouchableOpacity
                            onPress={onPress.bind(null, el)}
                            style={[styles.valueWrapper, {backgroundColor: el.id === selectedIndex ? '#F7F7F7' : 'transparent'}]}
                            key={el.id}>
                            <Text style={styles.value}>{el.value}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {},
    valuesWrapper: {
        paddingVertical: 5
    },
    valueWrapper: {
        borderRadius: 4,
    },
    value: {
        textAlign: "center",
        fontSize: 12,
        lineHeight: 16,
        fontFamily: 'IBMPlex-400',
        paddingVertical: 6
    }
})
