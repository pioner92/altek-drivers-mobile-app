import React, {useState} from 'react';
import {StyleSheet, View} from "react-native";
import moment from "moment";
import {TimePickerScrollView} from "./TimePickerScrolView/TimePickerScroolView";
import {TimePickerHeader} from "./TimePickerHeader/TimePickerHeader";

export const TimePicker = () => {
    const [selectedValue, setSelectedValue] = useState('Now')
    const timeList = ['Now', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00']
    const timeTypeList = ['am', 'pm']
    const [selectedTimeType, setSelectedTimeType] = useState(timeTypeList[0])


    const currentTime = moment().format('h')

    const timeListValidate = () => {
        const data = timeList.slice(1).filter((el) => {

            return +currentTime < +moment(el, 'hh').format('h')
        })
        data.unshift('Now')
        return data

    }

    return (
        <View style={styles.container}>
            <TimePickerHeader
                timeTypeList={timeTypeList}
                selectedTimeType={selectedTimeType}
                setSelectedTimeType={setSelectedTimeType}
            />
            <TimePickerScrollView timeListValidate={timeListValidate}
                                  selectedValue={selectedValue}
                                  setSelectedValue={setSelectedValue}/>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height:60,
        width:'100%',
        marginBottom:20
    },

})
