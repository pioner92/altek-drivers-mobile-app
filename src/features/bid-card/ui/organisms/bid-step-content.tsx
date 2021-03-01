import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Info, StepComponent} from '../molecules'

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
                <View style={styles.circleAndTitleWrapper}>
                    <View style={styles.circlesWrapper}>
                        <StepComponent number='1' title={pickUp} subTitle={createSubtitle(pickUpZip)}/>
                        <View style={styles.line}/>
                        <StepComponent number='2' title={deliveryTo} subTitle={createSubtitle(deliveryToZip)}/>
                    </View>
                </View>
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
    circlesWrapper: {
        alignItems: 'center',
    },
    circle: {
        width: 18,
        height: 18,
        borderWidth: 2,
        borderColor: '#E7F1F4',
        backgroundColor: '#4EA2EF',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
    },
    circleAndTitleWrapper: {
        height: 89,
        flexDirection: 'row',
        width: '60%',
    },
    circleTitle: {
        fontSize: 7,
        color: '#E7F1F4',
        fontFamily: 'IBMPlex-500',
    },
    line: {
        borderLeftWidth: 1,
        height: 36,
        alignSelf: 'flex-start',
        marginLeft: 10,
        borderColor: '#7B8CAE',
    },
    stepRow: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    city: {
        fontSize: 12,
        fontFamily: 'IBMPlex-500',
        marginLeft: 4,
        color: '#1F2934',
        letterSpacing: -0.01,
        lineHeight: 16,
        fontWeight: '500',
        fontStyle: 'normal',
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
    },
})
