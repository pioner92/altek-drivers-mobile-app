import React from 'react';
import {StyleSheet, View} from "react-native";
import {ColorCard} from "../../atoms/card/ColorCard";

type propsType = {
    LeftContent: React.FC
    RightContent: React.FC
}

export const BlueCards: React.FC<propsType> = ({LeftContent, RightContent}) => {
    return (
        <View style={styles.container}>
            <ColorCard><LeftContent/></ColorCard>
            <View style={{width: 18}}/>
            <ColorCard><RightContent/></ColorCard>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    }
})
