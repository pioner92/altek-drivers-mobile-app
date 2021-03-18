import React from 'react'
import {StyleSheet, View} from 'react-native'
import {WhiteCard} from '../../../../../../../ui/atoms/card/white-card'
import {TotalRateCardHeader} from './ui/atoms/total-rate-card-header'
import {TotalRateCardContentBlocks} from './ui/molecules/total-rate-card-content-blocks'
import {useStore} from 'effector-react'
import {$rateTotal} from '../../models/models'

export const TotalRateCard = () => {

    const totalRateCompleted = useStore($rateTotal)

    return (
        <View style={styles.container}>
            <WhiteCard style={{borderRadius: 12}}>
                <View style={styles.wrapper}>
                    <View style={[styles.rowWrapper, {height: 38}]}>
                        {/*<TotalRateCardHeader*/}
                        {/*    status='pending'*/}
                        {/*    style={{borderTopStartRadius: 12}}>Pending</TotalRateCardHeader>*/}
                        <TotalRateCardHeader
                            status='completed'
                            style={{borderTopEndRadius: 12}}>Completed</TotalRateCardHeader>
                    </View>
                    <TotalRateCardContentBlocks
                        leftBlockContent={{value: '0'}}
                        rightBlockContent={{value: totalRateCompleted.toString()}}
                    />
                </View>
            </WhiteCard>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        marginTop: 14,
    },
    rowWrapper: {
        flexDirection: 'row',
    },
    wrapper: {
        height: 127,
    },
})
