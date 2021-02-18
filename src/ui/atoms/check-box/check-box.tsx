import React, {useState} from 'react';
import {StyleSheet} from "react-native";
import { CheckBox } from 'react-native-elements'
import {CheckBoxCheckedSVG} from "../icons/check-box-checked-svg";
import {CheckBoxSVG} from "../icons";

type propsType = {
    toggleCheckBox: boolean
    setToggleCheckBox: () => void
}

export const CheckBoxComponent: React.FC<propsType> = ({toggleCheckBox, setToggleCheckBox}) => {
    return (
        <CheckBox
            wrapperStyle={{width:0,padding:0,margin:0}}
            containerStyle={{width:0,margin:0,padding:0}}
            center={true}
            checked={toggleCheckBox}
            onPress={setToggleCheckBox}
            checkedIcon={<CheckBoxCheckedSVG/>}
            uncheckedIcon={<CheckBoxSVG/>}
        />

    );
};

const styles = StyleSheet.create({
    container: {}
})
