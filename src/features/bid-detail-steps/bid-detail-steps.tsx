import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {StepCircles} from '../../ui/molecules/steps/steps'
import {styleConfig} from '../../StyleConfig'
import {VALUEINSTEAD} from '../../lib/nullableDateValidate/nullableDateValidate'
import {loadType} from "../../api/rest/loads/types";


type propsType = {
    item: loadType
    isCargo?: boolean
}


export const BidDetailSteps: React.FC<propsType> = ({item, isCargo = true}) => {
    return (
        <View style={styles.wrapper}>
            <StepCircles/>
            <View style={{justifyContent: 'space-between'}}>
                <StepContent point='Pick-up' direction={item.pickUpAt} date={`${item?.pick_up_date || VALUEINSTEAD }`}/>
                {isCargo ?
                    <CargoWrapper item={item}/> :
                    <View style={{height: 40}}/>
                }
                <StepContent point='Delivery' direction={item.deliverTo} date={`${item.delivery_date || VALUEINSTEAD}`}/>
            </View>
        </View>
    )
}


const DetailStateTitle: React.FC = ({children}) => {
    return (
        <Text style={styles.pointTitle}>{children}</Text>

    )
}

const DirectionTitle: React.FC = ({children}) => {
    return (
        <Text style={styles.directionTitle}>{children}</Text>

    )
}

type dateTitleType = {
    isEnabledTitleLocal: boolean
}
const DateTitle: React.FC<dateTitleType> = ({children, isEnabledTitleLocal = true}) => {
    return (
        <Text style={styles.dateTitle}>
            {children}
            {isEnabledTitleLocal &&
            <Text style={{color: '#798293', fontSize: 10, lineHeight: 13}}> ( local )</Text>
            }
        </Text>
    )
}

type stepContent = {
    point: string
    direction: string
    date: string
}

const StepContent: React.FC<stepContent> = ({point, direction, date}) => {
    return (
        <View style={{height: 52, justifyContent: 'space-between'}}>
            <DetailStateTitle>{point}</DetailStateTitle>
            <DirectionTitle>{direction}</DirectionTitle>
            <DateTitle isEnabledTitleLocal={date !== VALUEINSTEAD}>{date}</DateTitle>
        </View>
    )
}

const CargoWrapper: React.FC<propsType> = ({item}) => {
    const stackable = item.isCanPutOnTop ? 'stackable' : 'not stackable'
    return (
        <View style={{marginVertical: 20, marginLeft: 4}}>
            <Text style={styles.cargoTitle}>Cargo 1 ({stackable}, not turnable)</Text>
            <View style={styles.cargoPropertiesWrapper}>
                <View style={styles.propertyTitleWrapper}>
                    <CargoPropertyTitle>Pallets</CargoPropertyTitle>
                    <CargoPropertyTitle>Weight</CargoPropertyTitle>
                    <CargoPropertyTitle>Dims (LxWxH)</CargoPropertyTitle>
                </View>
                <View style={styles.propertyValueWrapper}>
                    <CargoPropertyValue>{item?.pallets}</CargoPropertyValue>
                    <CargoPropertyValue>{item?.weight}</CargoPropertyValue>
                    <CargoPropertyValue>{item?.width}x{item?.height}x{item?.length}</CargoPropertyValue>
                </View>
            </View>
        </View>
    )
}

const CargoPropertyTitle: React.FC = ({children}) => {
    return (
        <Text style={styles.propertyTitle}>{children}</Text>
    )
}

const CargoPropertyValue: React.FC = ({children}) => {
    return (
        <Text style={styles.propertyValue}>{children}</Text>

    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        width: '100%',
        height: 382,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9FAFF',
    },
    wrapper: {
        flexDirection: 'row',
    },
    pointTitle: {
        fontSize: 10,
        fontFamily: 'IBMPlex-400',
        lineHeight: 13,
        color: styleConfig.textColor.dark,
    },
    directionTitle: {
        fontSize: 14,
        fontFamily: 'IBMPlex-500',
        lineHeight: 18,
        color: styleConfig.textColor.dark,

    },
    dateTitle: {
        fontSize: 12,
        fontFamily: 'IBMPlex-400',
        letterSpacing: -0.02,
        lineHeight: 16,
        color: styleConfig.textColor.dark,
    },
    cargoTitle: {
        fontSize: 14,
        fontFamily: 'IBMPlex-500',
        lineHeight: 18,
        fontWeight: '500',
        fontStyle: 'normal',
        color: '#091735',
        marginBottom: 8,
    },
    propertyTitle: {
        fontSize: 12,
        fontFamily: 'IBMPlex-400',
        color: '#8E8E8E',
    },
    propertyValue: {
        fontSize: 12,
        fontFamily: 'IBMPlex-400',
        color: '#091735',
        lineHeight: 16,
    },
    cargoPropertiesWrapper: {
        flexDirection: 'row',
    },
    propertyTitleWrapper: {
        height: 62,
        justifyContent: 'space-between',
    },
    propertyValueWrapper: {
        marginLeft: 24,
        height: 62,
        justifyContent: 'space-between',

    },
})
