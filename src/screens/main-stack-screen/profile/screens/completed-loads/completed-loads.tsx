import React from 'react'
import {ScreenWrapper} from '../../../../../ui/atoms/screen-wrapper/screen-wrapper'
import {BidCard} from '../../../../../features/bid-card'
import {StyleSheet} from 'react-native'
import {BidList} from '../../../../../features/bid-list/bid-list'
import {useStore} from 'effector-react'
import {loadsListStore} from '../../../../../../Store/Store'

export const CompletedLoads = () => {
    const loads = useStore(loadsListStore)

    return (
        <ScreenWrapper style={{backgroundColor: '#fff'}}>
            <BidList
                refreshing={false}
                onRefresh={()=>{}}
                data={loads}
                Component={BidCard}
            />
        </ScreenWrapper>
    )
}

const styles = StyleSheet.create({
    container: {},
})
