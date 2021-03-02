import React, {useEffect} from 'react'
import {StyleSheet, View} from 'react-native'
import {ScreenWrapper} from '../../../../../src/ui/atoms/screen-wrapper/screen-wrapper'
import {BankCard} from './features/bank-card/bank-card'
import {styleConfig} from '../../../../../src/StyleConfig'
import {Button} from '../../../../../src/ui/atoms/buttons'

import {CardList} from './features/card-list/card-list'
import {useNavigate} from '../../../../../src/lib/hooks'
import links from '../../../../../links.json'
import {initCardData} from '../edit-card-data/features/bank-detail-inputs/models/models'
import {setIsVisibleBankCardData} from './features/bank-card/models/models'

export const MyCards: React.FC = () => {
    const navigate = useNavigate()

    const onPressAddNewCard = () => {
        navigate(links.editCardData)
    }

    useEffect(() => {
        initCardData()
        return () => {
            setIsVisibleBankCardData(false)
        }
    }, [])


    return (
        <ScreenWrapper enableNavigateButtons={true} style={styles.container}>
            <BankCard/>
            <CardList/>
            <View style={{flex: 1, justifyContent: 'flex-end', paddingBottom: 70}}>
                <Button theme='white' onPress={onPressAddNewCard}>Add new card</Button>
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
