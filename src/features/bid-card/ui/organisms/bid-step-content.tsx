import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Info, StepComponent} from '../molecules'
import {StepsWithTitle} from '../../../../ui/organisms/steps-with-title/steps-with-title'

type stepsType = {
    pickUp: string
    pickUpZip: string
    deliveryTo: string
    deliveryToZip: string
    pieces: number
    weight: number
    totalMiles: number
    emptyMiles: number
}

export const BidStepContent: React.FC<stepsType> = ({pickUp, deliveryTo, pieces, weight, totalMiles, emptyMiles, pickUpZip, deliveryToZip}) => {
    const createSubtitle = (title: string) => {
        return `${title}, USA`
    }

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <StepsWithTitle titleTop={pickUp} subtitleTop={createSubtitle(pickUpZip)} titleBottom={deliveryTo} subtitleBottom={createSubtitle(deliveryToZip)}/>
                <Info
                    value1={`${totalMiles} mi`}
                    value2={`${emptyMiles} out`}
                    value3={`${pieces} PC`}
                    value4={`${weight} LBS`}/>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        // height: 82,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    wrapper: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})
