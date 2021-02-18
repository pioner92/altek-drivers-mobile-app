import React from 'react';
import {View, StyleSheet, ViewStyle} from "react-native";

type propsType = {
    style?:ViewStyle
}

export const BtnWrapper: React.FC<propsType> = ({children,style}) => {
    return (
        <View style={[styles.container,style]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#fff',
        paddingVertical:16,
        paddingHorizontal:16,
    }
})
