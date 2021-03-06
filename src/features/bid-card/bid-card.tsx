import React, {useEffect} from 'react'
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {$geoLocationStore, setSelectedBidEvent} from '../../../Store/Store'
import {RightArrowSVG} from '../../ui/atoms/icons'
import {BidStepContent} from './ui/organisms'
import {styleConfig} from '../../StyleConfig'
import {getDistance} from '../../lib/get-distance/get-distance'
import {useStore} from 'effector-react'
import {LoadLiveTimer} from '../load-live-timer/load-live-timer'
import {useInterpolate, useTiming, useValue} from '../../lib/animation-hooks/Hooks'
import {loadType} from '../../api/rest/loads/types'
import {links} from '../../navigation/links'
import {BIDLIVETIME} from '../../screens/main-stack-screen/bids/bid-detail/bid-detail-for-active-loads/bid-details-for-active-loads'

type BidCartType = {
    item: loadType
}


export const BidCard: React.FC<BidCartType> = React.memo( ({item}) => {
    const {navigate} = useNavigation()
    const currentGeo = useStore($geoLocationStore)
    const animatedValue = useValue(0)

    const interpolateHeight = useInterpolate(animatedValue, [0, 1], [1, 152])

    const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

    const animatedStyle = {
        height: interpolateHeight,
    }

    const openBidsDetailMenu = () => {
        navigate(links.bidDetailForActiveLoads, {item})
        setSelectedBidEvent(item.id)
    }

    const milesOut = item?.start_location?.split(',')
    const distance = (getDistance(+milesOut?.[0], +milesOut?.[1], currentGeo.latitude, currentGeo.longitude)).toFixed(1)


    useEffect(()=>{
        useTiming(animatedValue, 1, 300, false).start()
    }, [])

    return (
        <AnimatedTouchableOpacity
            activeOpacity={0.6}
            onPress={openBidsDetailMenu}
            style={[styles.container, styleConfig.shadowMenu, animatedStyle]}
        >
            <SeeDetailBid date={item.created_date}/>
            <View style={styles.content}>
                <BidStepContent totalMiles={item.miles} emptyMiles={+distance} pieces={item.pieces} weight={item.weight}
                    pickUp={item.pickUpAt} deliveryTo={item.deliverTo} pickUpZip={item.pickUpAt_zip}
                    deliveryToZip={item.deliverTo_zip}/>
            </View>
        </AnimatedTouchableOpacity>
    )
} )


type seeDetailBidType = {
    date: string
}
export const SeeDetailBid: React.FC<seeDetailBidType> = ({date}) => {
    return (
        <View>
            <View style={styles.header}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.headerTitle}>See details - </Text>
                    <LoadLiveTimer date={date} BIDLIVETIME={BIDLIVETIME}/>
                </View>
                <RightArrowSVG/>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        height: 152,
        marginBottom: 12,
        backgroundColor: '#FFFFFF',
        width: '100%',
        borderRadius: 6,
    },
    header: {
        flexDirection: 'row',
        height: 38,
        borderBottomWidth: 1,
        borderColor: '#F4F4F4',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 14,
    },
    headerTitle: {
        width: 80,
        fontSize: 14,
        lineHeight: 18,
        fontFamily: 'IBMPlex-400',
        fontWeight: '400',
        letterSpacing: -0.01,
        color: '#798293',
    },
    content: {
        height: 113,
        width: '100%',
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})
