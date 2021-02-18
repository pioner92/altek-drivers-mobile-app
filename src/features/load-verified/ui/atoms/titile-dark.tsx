import React from 'react';
import { StyleSheet, FlexStyle} from "react-native";
import {VerifiedScreenTitle} from "../../../../ui/atoms/title";
import {styleConfig} from "../../../../StyleConfig";

type propsType = {
    style?: FlexStyle
}

export const TitleDark: React.FC<propsType> = ({children,style}) => {
    return (
        <VerifiedScreenTitle style={[style,styles.text]} color={styleConfig.textColor.dark}>{children}</VerifiedScreenTitle>
    );
};

const styles = StyleSheet.create({
    text: {
        marginBottom:10,
    }
})
