import React from 'react';
import {View, StyleSheet, Text} from "react-native";
import {useStore} from "effector-react";
import {$inputValuePieces, $inputValueWeight, setInputValuePieces, setInputValueWeight} from "./models";
import {ButtonEdit, Line, Row} from "./ui";
import {styleConfig} from "../../../../src/StyleConfig";


type propsType = {
    piecesDescription:string
    weightDescription:string
}

export const Load: React.FC<propsType> = ({piecesDescription='0x0x0',weightDescription='lbs'}) => {

    const piecesValue = useStore($inputValuePieces)
    const weightValue = useStore($inputValueWeight)

    const onChangePieces = (text:string) => {
        setInputValuePieces(text)

    }
    const onChangeWeight = (text:string) => {
        setInputValueWeight(text)
    }


    return (
        <View style={[styles.container,styleConfig.shadowMenu]}>
            <View style={styles.content}>
                <Row currentEnable={false} inputValue={piecesValue} onChange={onChangePieces} description={piecesDescription} label='Pieces'/>
                <Line/>
                <Row currentEnable={false} inputValue={weightValue} onChange={onChangeWeight} description={weightDescription} label='Total Weight' />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width:'100%',
    },
    content:{
        height:114,
        backgroundColor:'#fff',
        justifyContent:'space-between',
        paddingVertical:16,
        width:'100%',
        paddingHorizontal:16,
        borderRadius:6,
    }
})
