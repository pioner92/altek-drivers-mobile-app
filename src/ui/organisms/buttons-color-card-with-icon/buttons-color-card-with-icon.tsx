import React from 'react';
import {View, StyleSheet, ViewStyle} from "react-native";
import {ButtonColorCardWithIcon} from "../../molecules/button-color-card-with-icon";

type propsType = {
    LeftComponent:React.FC
    RightComponent:React.FC
    style?:ViewStyle
}


export const ButtonsColorCardWithIcon: React.FC<propsType> = ({LeftComponent,RightComponent,style}) => {
    return (
        <View style={[styles.container,style]}>
            <LeftComponent/>
            <View style={{width:18}}/>
            <RightComponent/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection:"row"
    }
})
