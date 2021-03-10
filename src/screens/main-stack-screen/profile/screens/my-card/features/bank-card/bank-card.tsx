import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {styleConfig} from '../../../../../../../src/StyleConfig'
import {separatorCardNumber} from './lib/separatorCardNumber'
import {BankCardGradient} from './ui/atoms/bank-card-gradient'
import {useStore} from 'effector-react'
import {$isVisibleBankCardData} from './models/models'
import {
    $inputValueCardDate,
    $inputValueCardHolderName,
    $inputValueCardNumber,
} from '../../../edit-card-data/features/bank-detail-inputs/models/models'

export const BankCard: React.FC = () => {
    const isVisibleCardData = useStore($isVisibleBankCardData)
    const cardNumber = useStore($inputValueCardNumber)
    const cardHolderName = useStore($inputValueCardHolderName)
    const cardDate = useStore($inputValueCardDate)

    const circles = '••••'
    const cardNumberArr = separatorCardNumber(isVisibleCardData ? cardNumber : circles.repeat(4), 4)


    return (
        <TouchableOpacity style={[styles.container, styleConfig.shadowModal]}>
            <BankCardGradient>
                <View style={styles.cardNumberWrapper}>
                    {cardNumberArr.map((el, index) => {
                        return (
                            <Text key={index}
                                style={[styles.cardValues, !isVisibleCardData && styles.circles, {letterSpacing: 2}]}>{el}</Text>
                        )
                    })}
                </View>
                <View style={styles.row}>
                    <View style={styles.cardHolderWrapper}>
                        <Text style={styles.cardTitle}>Card Holder</Text>
                        {isVisibleCardData ?
                            <Text style={styles.cardValues}>{cardHolderName}</Text> :
                            <Text style={[styles.cardValues, styles.circles]}>{circles}</Text>
                        }

                    </View>
                    <View style={styles.cardExpDateWrapper}>
                        <Text style={styles.cardTitle}>EXP DATE</Text>
                        {isVisibleCardData ?
                            <Text style={styles.cardValues}>{cardDate}</Text> :
                            <Text style={[styles.cardValues, styles.circles]}>{circles}</Text>
                        }
                    </View>
                </View>
            </BankCardGradient>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        // width: '100%',
        maxHeight: 288,
        marginTop: 31,
        // marginBottom: 26
    },
    card: {
        height: 180,
        width: '100%',
        borderRadius: 13,
        paddingHorizontal: 28,
        paddingBottom: 29,
        paddingTop: 63,
        justifyContent: 'space-between',
    },
    cardNumberWrapper: {
        width: '100%',
        height: 18,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardValues: {
        color: '#fff',
        fontSize: 13,
        lineHeight: 18,
        fontFamily: 'Nunito Sans',
    },
    cardHolderWrapper: {
        height: 32,
    },
    cardExpDateWrapper: {
        height: 32,
    },
    cardTitle: {
        color: '#fff',
        opacity: 0.5,
        fontSize: 8,
        lineHeight: 11,
        textTransform: 'uppercase',
    },
    circles: {
        color: '#98B7EE',
    },
    row: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },

})
