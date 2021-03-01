import React from 'react'
import {Dimensions, ScrollView, StyleSheet} from 'react-native'
import {CardListItem} from './ui/moleculs/card-list-item'
import {$cardsData} from '../../../edit-card-data/features/bank-detail-inputs/models/models'
import {useStore} from 'effector-react'

const {width} = Dimensions.get('window')


export const CardList: React.FC = () => {
    const cards = useStore($cardsData)

    return (
        <ScrollView style={{width, alignSelf: 'center'}}
            contentContainerStyle={{paddingHorizontal: 16, paddingTop: 26}}>
            {cards.map((el) => {
                return (
                    <CardListItem number={el.cardNumber.slice(-4)} id={el.id} data={el} key={el.id}/>
                )
            })}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {},
})
