import React from 'react';
import {StyleSheet, SafeAreaView, ViewStyle} from "react-native";
import {styleConfig} from "../../../StyleConfig";


type propsType = {
    style?:ViewStyle
}
export const SafeAreaComponent: React.FC<propsType> = ({children,style}) => {
    return (
        <SafeAreaView style={[styles.container,style]}>
            {children}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        // backgroundColor: styleConfig.screenBackground,
        backgroundColor: "#fff",
    }
})
