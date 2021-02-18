import React from 'react';
import {StyleSheet, View} from "react-native";
import {CheckBoxItem} from "../../../../../ui/molecules/check-box-item";
import {useStore} from "effector-react";
import {$checkedIndex, setCheckedIndex} from "./models";


type propsType = {
    callback?:(index:number)=>void
}
export const CheckBox: React.FC<propsType> = ({callback}) => {

    const values = [
        {index: 0, value: 'No'},
        {index: 1, value: 'Yes'}
    ]

    const checkedIndex = useStore($checkedIndex)

    const onChange = (index: number) => {
        setCheckedIndex(index)
        callback && callback(index)
    }
    return (
        <View style={styles.container}>
            <CheckBoxItem
                index={values[0].index}
                callback={onChange}
                isChecked={checkedIndex === values[0].index}>
                {values[0].value}
            </CheckBoxItem>
            <CheckBoxItem
                index={values[1].index}
                callback={onChange}
                isChecked={checkedIndex === values[1].index}>
                {values[1].value}
            </CheckBoxItem>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    }
})
