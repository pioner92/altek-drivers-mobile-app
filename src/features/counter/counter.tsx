import React, {useEffect, useState} from 'react';
import {Text, TextStyle, ViewStyle} from "react-native";
import moment from "moment";


type counterType = {
    style?: ViewStyle | TextStyle
    callback?: (status: boolean) => void
    value:number
}

export const Counter: React.FC<counterType> = ({style, callback,value}) => {

    const min = moment.unix(value).format('mm:ss')
    const [counter, setCounter] = useState(min)

    useEffect(() => {
        setCounter(moment.unix(value).format('mm:ss'))
    }, [value])

    return (
        <Text {...{style}}> ({counter})</Text>
    );
};

