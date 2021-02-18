import React from 'react';
import {StyleSheet} from "react-native";
import SwitchSelector from "react-native-switch-selector";

type options = Array<{label:string,value:number}>

export type switchPropsType = {
    options:options
    onChange:(value:number)=>void
}

export const Switch: React.FC<switchPropsType> = ({options,onChange}) => {

    return (
            <SwitchSelector
                style={styles.container}
                height={20}
                fontSize={10}
                selectedTextStyle={styles.text}
                textStyle={styles.text}
                textColor={'#3284D2'}
                buttonColor={'#3284D2'}
                options={options}
                initial={0}
                onPress={onChange} />
    );
};

const styles = StyleSheet.create({
    container:{
        width:54,
        borderColor:'#3284D2',
        borderRadius:20,
        borderWidth:1,
    },
    text:{
        fontFamily:'IBMPlex-600',
        fontSize:10,
        lineHeight:13
    }
})



