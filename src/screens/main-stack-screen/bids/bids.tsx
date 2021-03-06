import React, {useEffect, useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {ScreenWrapper} from '../../../ui/atoms/screen-wrapper/screen-wrapper'
import {styleConfig} from '../../../StyleConfig'
import {BidCard} from '../../../features/bid-card'
import {useStore} from 'effector-react'
import {loadsListStore} from '../../../../Store/Store'
import {getLoads} from '../../../api/rest/loads/get-loads'
import {$animValuePreloader, showPreloader} from '../../../features/preloader/models/models'
import {DarkBgAnimated} from '../home/available-home/features/dark-bg-animated/dark-bg-animated'
import {FilterButton} from '../../../features/filter-button/filter-button'
import {StackScreenCreator} from '../../../features/navigation/features/stack-screen-creator/stack-screen-creator'
import {links} from '../../../navigation/links'
import {BidList} from '../../../features/bid-list/bid-list'


export const Bids: React.FC = () => {
    const loads = useStore(loadsListStore)
    const [isRefreshing, setIsRefreshing] = useState(true)
    const preloaderAnimValue = useStore($animValuePreloader)


    const getLoadsHandler = async () => {
        await getLoads({})
        setIsRefreshing(false)
    }

    useEffect(() => {
        getLoadsHandler()
    }, [])


    return (
        <>
            <ScreenWrapper style={{backgroundColor: styleConfig.screenBackgroundGrey}}>
                <View style={styles.container}>
                    <BidList
                        Component={BidCard}
                        data={loads}
                        onRefresh={getLoads.bind(null, {})}
                        refreshing={isRefreshing}
                    />
                </View>
            </ScreenWrapper>
            <DarkBgAnimated animatedValue={preloaderAnimValue}/>
        </>
    )
}


export const BidsStackScreen = () => StackScreenCreator({
    link: links.bids,
    component: Bids,
    title: 'Loads',
    HeaderRight: <FilterButton/>,
})


const styles = StyleSheet.create({
    container: {},

    flatList: {
        paddingHorizontal: 13,
        paddingBottom: 70,
        paddingTop: 14,
    },
})
