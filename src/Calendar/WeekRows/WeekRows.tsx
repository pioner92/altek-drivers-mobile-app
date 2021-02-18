import React from 'react';
import {StyleSheet, View} from "react-native";
import {WeekRow} from "./WeekRow/WeekRow";
import {weekType} from "../Calendar";

type weekRowsType = {
    weeks: {
        currentWeekArr: weekType,
        nextWeekArr?: weekType
    }
    callback: Function
    selectedDay: string
}

const WeekRows: React.FC<weekRowsType> = ({weeks, callback, selectedDay}) => {
    return (
        <View style={styles.container}>
            <WeekRow week={weeks.currentWeekArr} selectedDay={selectedDay} callback={callback}/>
            {weeks.nextWeekArr &&
                <WeekRow week={weeks.nextWeekArr} selectedDay={selectedDay} callback={callback}/>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 68,
        justifyContent: 'center',
        width: '100%',
    },

})

export default WeekRows;
