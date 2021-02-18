import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from "react-native";
import { useNavigation } from '@react-navigation/native';
import {geoLocationStore, setSelectedBidEvent} from "../../../Store/Store";
import {RightArrowSVG} from "../../ui/atoms/icons";
import {BidStepContent} from "./ui/organisms";
import {loadType} from "../../api/rest/loads/get-loads";
import links from '../../../links.json'
import {styleConfig} from "../../StyleConfig";
import {getDistance} from "../../../utils/get-distance/get-distance";
import {getDb} from "../../../utils/db";
import {getCurrentGeo} from "../../../utils/get-current-geo";
import {useStore} from "effector-react";

type BidCartType = {
    item:loadType
}

export const BidCard:React.FC<BidCartType> = ({item}) => {

    const { navigate } = useNavigation();
    const currentGeo = useStore(geoLocationStore)

    const openBidsDetailMenu = () => {
        navigate(links.bidDetail,{item})
        setSelectedBidEvent(item.id)
    }

    const milesOut = item?.start_location?.split(',')
    //@ts-ignore
    const distance = (getDistance(milesOut[0],milesOut[1],currentGeo.latitude,currentGeo.longitude)).toFixed(1)
    // const distance = (getDistance(milesOut[0],milesOut[1],40.741895,-73.989308)).toFixed(1)

    return (
        <TouchableOpacity
            activeOpacity={0.6}
            onPress={openBidsDetailMenu}
            style={[styles.container,styleConfig.shadowMenu]}
        >
            <SeeDetailBid callback={openBidsDetailMenu}/>
            <View style={styles.content}>
                <BidStepContent totalMiles={item.miles} emptyMiles={+distance} pieces={item.pieces} weight={item.weight} pickUp={item.pickUpAt} deliveryTo={item.deliverTo} pickUpZip={item.pickUpAt_zip} deliveryToZip={item.deliverTo_zip}/>
            </View>
        </TouchableOpacity>
    );
};


type seeDetailBidType = {
    callback:()=>void
}
export const SeeDetailBid:React.FC<seeDetailBidType> = ({callback}) => {
    return (
        <View >
            <TouchableOpacity activeOpacity={0.5} onPress={callback} style={styles.header}>
                <Text style={styles.headerTitle}>See details</Text>
                <RightArrowSVG/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        height:152,
        marginBottom:12,
        backgroundColor:'#FFFFFF',
        width:'100%',
        borderRadius:6,
    },
    header:{
        flexDirection:'row',
        height:36,
        borderBottomWidth:1,
        borderColor:'#F4F4F4',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:14,
    },
    headerTitle:{
        fontSize:14,
        fontFamily:'IBMPlex-400',
        fontWeight:'400',
        letterSpacing:-0.01,
        fontStyle:'normal',
        color:'#798293'
    },
    content:{
        height:113,
        width:'100%',
        padding:12,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    }
})
