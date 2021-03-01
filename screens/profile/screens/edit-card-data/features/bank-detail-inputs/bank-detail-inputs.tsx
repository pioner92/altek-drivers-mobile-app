import React from 'react'
import {StyleSheet, View} from 'react-native'
import {WhiteCard} from '../../../../../../src/ui/atoms/card/white-card'
import {Input} from '../../../../../../src/ui/atoms/input'
import {
    $inputValueCardCVC,
    $inputValueCardDate,
    $inputValueCardHolderName,
    $inputValueCardNumber,
    setInputValueCardCVS,
    setInputValueCardDate,
    setInputValueCardHoldName,
    setInputValueCardNumber,
} from './models/models'
import {useStore} from 'effector-react'


export const BankDetailInputs: React.FC = () => {
    const cardNumber = useStore($inputValueCardNumber)
    const holdName = useStore($inputValueCardHolderName)
    const cardDate = useStore($inputValueCardDate)
    const cardCvs = useStore($inputValueCardCVC)


    return (
        <WhiteCard style={{marginTop: 26}}>
            <Input type='number-pad' onChange={setInputValueCardNumber} value={cardNumber} placeholder='Card Number'/>
            <Input type='name-phone-pad' onChange={setInputValueCardHoldName} value={holdName}
                placeholder='Holder Name'/>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Input type='default' style={{flex: 1}} onChange={setInputValueCardDate} value={cardDate}
                    placeholder='Month/Year'/>
                <Input type='number-pad' style={{flex: 1}} onChange={setInputValueCardCVS} value={cardCvs}
                    placeholder='CVC'/>
            </View>
        </WhiteCard>
    )
}

const styles = StyleSheet.create({
    container: {},
})
