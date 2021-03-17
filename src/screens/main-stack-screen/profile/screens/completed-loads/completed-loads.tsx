import React from 'react'
import {ScreenWrapper} from '../../../../../ui/atoms/screen-wrapper/screen-wrapper'
import {BidList} from '../../../../../features/bid-list/bid-list'
import {StackScreenProps} from '@react-navigation/stack'
import {BidCardCompleted} from '../../../../../features/bid-card-completed/bid-card-completed'
import {useStore} from 'effector-react'
import {$loadHistory, nexPageLoadHistory} from './models/models'

export const CompletedLoads: React.FC<StackScreenProps<any>> = ({route, navigation}) => {
    const loads = useStore($loadHistory).map((el) => el.load)

    const onEndReached = () => {
        nexPageLoadHistory()
    }


    return (
        <ScreenWrapper isEnabledHeightController={true} style={{backgroundColor: '#fff'}}>
            <BidList
                onEndReachedThreshold={0.4}
                onEndReached={onEndReached}
                refreshing={false}
                data={loads}
                Component={BidCardCompleted}
            />
        </ScreenWrapper>
    )
}

