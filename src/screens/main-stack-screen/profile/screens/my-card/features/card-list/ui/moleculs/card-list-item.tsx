import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {WhiteCard} from '../../../../../../../../../ui/atoms/card/white-card'
import {styleConfig} from '../../../../../../../../../StyleConfig'
import {PenSVG} from '../../../../../../../../../ui/atoms/icons/pen-svg'
import {CrossSVG} from '../../../../../../../../../ui/atoms/icons/cross-svg'
import {useNavigate} from '../../../../../../../../../lib/hooks'
import {
    deleteCardData,
    setInputValueCardCVS,
    setInputValueCardDate,
    setInputValueCardHoldName,
    setInputValueCardNumber,
} from '../../../../../edit-card-data/features/bank-detail-inputs/models/models'
import {setIsVisibleBankCardData} from '../../../bank-card/models/models'
import {cardDataItemType} from '../../../../../edit-card-data/lib/cards-data-handler'
import {links} from '../../../../../../../../../navigation/links'


type propsType = {
    number: string
    data: cardDataItemType
    id: number
}

export const CardListItem: React.FC<propsType> = ({number, id, data}) => {
    const navigate = useNavigate()
    const circles = '•'.repeat(4)

    const setCardInputs = () => {
        setInputValueCardNumber(data?.cardNumber)
        setInputValueCardHoldName(data?.cardHolderName)
        setInputValueCardDate(data?.cardDate)
        setInputValueCardCVS(data?.cardCvs)
    }

    const onSelectCard = () => {
        setCardInputs()
        setIsVisibleBankCardData(true)
    }

    const onPressEditCardData = () => {
        setCardInputs()
        navigate(links.editCardData, {id})
    }
    const onPressDeleteCard = () => {
        deleteCardData(id)
    }

    return (
        <TouchableOpacity onPress={onSelectCard} activeOpacity={0.6}>
            <WhiteCard style={styles.container}>
                <View style={{flex: 1}}>
                    <Text style={styles.text}>{circles} <Text style={styles.number}>{number}</Text></Text>
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity onPress={onPressEditCardData}>
                        <PenSVG/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onPressDeleteCard}>
                        <CrossSVG/>
                    </TouchableOpacity>
                </View>
            </WhiteCard>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 17,
        flexDirection: 'row',
        marginBottom: 15,
    },
    text: {
        color: styleConfig.textColor.dark,
    },
    number: {
        fontFamily: 'IBMPlex-400',
        fontSize: 14,
        lineHeight: 18,
    },
    buttons: {
        flexDirection: 'row',
        width: 40,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})
