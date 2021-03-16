import React, {useEffect, useState} from 'react'
import {Text, View} from 'react-native'
import moment from 'moment'
import {useTimer} from '../../lib/hooks/useTimer'
import {useStore} from 'effector-react'
import {$isStartedCounter, setCounter, startTimer, TIMER_VALUE} from '../button-with-counter/models/models'
import {getDb, setDb} from '../../lib/db'
import {TIMERBID} from '../../lib/db/constants'


type propsType = {
    date: string
    BIDLIVETIME: number

}

export const LoadLiveTimer: React.FC<propsType> = ({date, BIDLIVETIME}) => {
    const isStartedTimer = useStore($isStartedCounter)


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


    useEffect(() => {
        if (isStartedTimer) {
            return
        }
        (async function() {
            const currentTime = Date.now()
            const oldTime = await getDb(TIMERBID)
            if (oldTime) {
                const time = TIMER_VALUE - ((currentTime - Number(oldTime)) / 1000)
                if (time > 0) {
                    setCounter(time)
                    startTimer()
                } else {
                    setDb(TIMERBID, '')
                }
            }
        })()
    }, [timeValue])

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

