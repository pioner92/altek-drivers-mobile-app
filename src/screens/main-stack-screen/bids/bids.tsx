import React, {useEffect, useState} from 'react'
import {FlatList, StyleSheet, View} from 'react-native'
import {ScreenWrapper} from '../../../ui/atoms/screen-wrapper/screen-wrapper'
import {styleConfig} from '../../../StyleConfig'
import {BidCard} from '../../../features/bid-card'
import {useStore} from 'effector-react'
import {loadsListStore} from '../../../../Store/Store'
import {getLoads} from '../../../api/rest/loads/get-loads'
import {Preloader} from '../../../features/preloader/preloader'
import {$animValuePreloader, showPreloader} from '../../../features/preloader/models/models'
import {DarkBgAnimated} from '../home/available-home/features/dark-bg-animated/dark-bg-animated'
import {FilterButton} from '../../../features/filter-button/filter-button'
import {StackScreenCreator} from '../../../features/navigation/features/stack-screen-creator/stack-screen-creator'
import {links} from '../../../navigation/links'


const INTERVAL = 20000

export const Bids: React.FC = () => {
    const loads = useStore(loadsListStore)
    const [isRefreshing, setIsRefreshing] = useState(true)
    const preloaderAnimValue = useStore($animValuePreloader)


    const getLoadsHandler = async () => {
        await getLoads({})
        setIsRefreshing(false)
    }

    useEffect(() => {
        showPreloader()
        getLoadsHandler()

        const timer = setInterval(() => {
            getLoadsHandler()
        }, INTERVAL)

        return () => {
            clearInterval(timer)
        }
    }, [])

    return (
        <>
            <ScreenWrapper enableNavigateButtons={false} style={{backgroundColor: styleConfig.screenBackgroundGrey}}>
                <View style={styles.container}>
                    <FlatList
                        onRefresh={() => getLoads({})}
                        refreshing={isRefreshing}
                        inverted={false}
                        contentContainerStyle={styles.flatList}
                        data={loads}
                        renderItem={({item}) => <BidCard item={item}/>}
                        keyExtractor={(item) => item.id.toString()}
                    />
                </View>
            </ScreenWrapper>
            <DarkBgAnimated animatedValue={preloaderAnimValue}/>
            <Preloader/>
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
