import React from 'react';
import {View, StyleSheet, ViewStyle, FlexStyle} from "react-native";

type propsType = {
    style?:ViewStyle | FlexStyle
}

export const Wrapper: React.FC <propsType>= ({children,style,}) => {
    return (
        <View   style={[styles.container,style]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal:22,
    }
})
