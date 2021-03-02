import React, {memo} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {geoLocationStore, setSelectedBidEvent} from '../../../Store/Store'
import {RightArrowSVG} from '../../ui/atoms/icons'
import {BidStepContent} from './ui/organisms'
import {loadType} from '../../api/rest/loads/get-loads'
import links from '../../../links.json'
import {styleConfig} from '../../StyleConfig'
import {getDistance} from '../../../utils/get-distance/get-distance'
import {useStore} from 'effector-react'
import {LoadLiveTimer} from '../load-live-timer/load-live-timer'
import {BIDLIVETIME} from '../../../screens/main-stack-screen/bid-detail/bid-detail'

type BidCartType = {
    item: loadType
}


export const BidCardInner: React.FC<BidCartType> = ({item}) => {
    const {navigate} = useNavigation()
    const currentGeo = useStore(geoLocationStore)

    const openBidsDetailMenu = () => {
        navigate(links.bidDetail, {item})
        setSelectedBidEvent(item.id)
    }

    const milesOut = item?.start_location?.split(',')
    // @ts-ignore
    const distance = (getDistance(milesOut[0], milesOut[1], currentGeo.latitude, currentGeo.longitude)).toFixed(1)

    return (
        <TouchableOpacity
            activeOpacity={0.6}
            onPress={openBidsDetailMenu}
            style={[styles.container, styleConfig.shadowMenu]}
        >
            <SeeDetailBid callback={openBidsDetailMenu} date={item.created_date}/>
            <View style={styles.content}>
                <BidStepContent totalMiles={item.miles} emptyMiles={+distance} pieces={item.pieces} weight={item.weight}
                    pickUp={item.pickUpAt} deliveryTo={item.deliverTo} pickUpZip={item.pickUpAt_zip}
                    deliveryToZip={item.deliverTo_zip}/>
            </View>
        </TouchableOpacity>
    )
}


type seeDetailBidType = {
    callback: () => void
    date: string
}
export const SeeDetailBid: React.FC<seeDetailBidType> = ({callback, date}) => {
    return (
        <View>
            <TouchableOpacity activeOpacity={0.5} onPress={callback} style={styles.header}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.headerTitle}>See details - </Text>
                    <LoadLiveTimer date={date} BIDLIVETIME={BIDLIVETIME}/>
                </View>
                <RightArrowSVG/>
            </TouchableOpacity>
        </View>
    )
}


export const BidCard = memo(BidCardInner)

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
