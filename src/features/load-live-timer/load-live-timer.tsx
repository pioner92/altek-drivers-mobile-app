import React, {useState} from 'react'
import {Text, View} from 'react-native'
import moment from 'moment'
import {useTimer} from '../../lib/hooks/useTimer'


type propsType = {
    date: string
    BIDLIVETIME: number

}

export const LoadLiveTimer: React.FC<propsType> = ({date, BIDLIVETIME}) => {
    const bidLiveTimeRemains = () => {
        return BIDLIVETIME - ((Date.now() - Date.parse(date)) / 1000)
    }

    const [timeValue, setTimeValue] = useState(bidLiveTimeRemains())


    const headerTimer = () => {
        if (timeValue >= 0) {
            return moment.unix(timeValue).format('mm:ss')
        } else return '00:00'
    }

    useTimer(() => setTimeValue(bidLiveTimeRemains()))


    return (
        <View>
            <Text
                style={{
                    marginRight: 16,
                    color: '#FF4869',
                    fontSize: 13,
                    fontFamily: 'IBMPlex-500',
                    lineHeight: 17,
                }}>{headerTimer()}</Text>
        </View>
    )
}

