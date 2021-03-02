import {useNavigation} from '@react-navigation/native'
import {TouchableOpacity} from 'react-native'
import links from '../../../links.json'
import React from 'react'
import {FilterIcon} from '../../ui/molecules/icons/filter-icon'
import {useStore} from 'effector-react'
import {$isFilteredBids} from '../../../screens/main-stack-screen/bids/filter/models'

export const FilterButton = () => {
    const navigation = useNavigation()
    const isFilteredBids = useStore($isFilteredBids)
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate(links.filter)}
            style={{marginRight: 18}}>
            <FilterIcon enableBadge={isFilteredBids}/>
        </TouchableOpacity>
    )
}
