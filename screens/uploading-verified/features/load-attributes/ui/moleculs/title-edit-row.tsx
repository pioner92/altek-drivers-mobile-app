import React from 'react';
import {View, StyleSheet} from "react-native";
import {TitleDark, TitleGrey} from "../../../../../../src/features/load-verified/ui/atoms";
import {ButtonEdit} from "../atoms/button-edit";


type propsType = {
    callback:()=>void
}

export const TitleEditRow: React.FC<propsType> = ({children,callback}) => {
    return (
        <View style={styles.container}>
            <TitleGrey style={{marginBottom:0}}>{children}</TitleGrey>
            <ButtonEdit callback={callback}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        width:'100%',
        height:18,
        justifyContent:"space-between",
        alignItems:"center",
        marginTop:32,
        marginBottom:10
    }
})
