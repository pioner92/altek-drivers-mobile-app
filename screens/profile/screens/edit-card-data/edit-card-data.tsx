import React, {useEffect} from 'react'
import {StyleSheet, View} from 'react-native'
import {ScreenWrapper} from '../../../../src/ui/atoms/screen-wrapper/screen-wrapper'
import {styleConfig} from '../../../../src/StyleConfig'
import {Button} from '../../../../src/ui/atoms/buttons'
import {useStore} from 'effector-react'
import {
    $inputValueCardCVC,
    $inputValueCardDate,
    $inputValueCardHolderName,
    $inputValueCardNumber,
    getNumberLength,
    resetCardInputs,
    saveCardData,
} from './features/bank-detail-inputs/models/models'
import {BankCard} from '../my-card/features/bank-card/bank-card'
import {BankDetailInputs} from './features/bank-detail-inputs/bank-detail-inputs'
import {setIsVisibleBankCardData} from '../my-card/features/bank-card/models/models'
import {useNavigate} from '../../../../src/lib/hooks'
import links from '../../../../links.json'
import {StackScreenProps} from '@react-navigation/stack'


export const EditCardData: React.FC<StackScreenProps<any>> = ({route}) => {
    const navigate = useNavigate()
    // @ts-ignore
    const id = route?.params?.id

    const cardNumber = useStore($inputValueCardNumber)
    const cardName = useStore($inputValueCardHolderName)
    const cardDate = useStore($inputValueCardDate)
    const cardCvs = useStore($inputValueCardCVC)

    const onPressSaveCard = () => {
        if (getNumberLength(cardNumber) === 16 && cardName && cardDate.length > 5 && cardCvs.length === 3) {
            saveCardData({id})
            navigate(links.myCards)
        }
    }

    useEffect(() => {
        setIsVisibleBankCardData(true)
        return () => {
            resetCardInputs()
            setIsVisibleBankCardData(false)
        }
    }, [])

    return (
        <ScreenWrapper enableNavigateButtons={true} style={styles.container}>
            <BankCard/>
            <BankDetailInputs/>
            <View style={{flex: 1, justifyContent: 'flex-end', paddingBottom: 70}}>
                <Button onPress={onPressSaveCard}>Save card</Button>
            </View>
        </ScreenWrapper>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: styleConfig.screenPadding,
        backgroundColor: '#fff',
    },
})
