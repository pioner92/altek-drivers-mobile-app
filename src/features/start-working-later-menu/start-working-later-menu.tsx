import React, {useEffect} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {SelectTitle} from '../../UIComponents/Title/SelectTitle'
import {CalendarContainer} from '../../Calendar/CalendarContainer'
import {TimePicker} from '../../TimePicker/TimePicker'
import {useStore} from 'effector-react'
import {$startWorkingLaterAnimValue} from './models'
import {Button} from '../../ui/atoms/buttons'
import {SwipeMenuWrapper} from '../swipe-menu-wrapper'
import {$swipeMenuWrapperValueDY} from '../swipe-menu-wrapper/models/models'
import {styleConfig} from '../../StyleConfig'
import {LocationSVG} from '../../ui/atoms/icons/location-svg'
import {Input} from '../../ui/atoms/input'
import {ButtonsColorCardWithIcon} from '../../ui/organisms/buttons-color-card-with-icon/buttons-color-card-with-icon'
import {ColorCard} from '../../ui/atoms/card/ColorCard'
import {ButtonColorCardWithIcon} from '../../ui/molecules/button-color-card-with-icon'


export const StartWorkLetterMenu: React.FC<any> = ({closeMenu}) => {
    const value = useStore($startWorkingLaterAnimValue)
    const dy = useStore($swipeMenuWrapperValueDY)

    const onPressStartWorking = () => {
        closeMenu()
    }

    useEffect(() => {
        if (dy > 100) {
            closeMenu()
        }
    }, [dy])

    return (
        <SwipeMenuWrapper zIndex={100} value={value}>
            <View style={styles.container}>
                <SelectTitle>Select location</SelectTitle>
                <ButtonsColorCardWithIcon LeftComponent={UseCurrentLocation} RightComponent={InputZipCode}/>
                <SelectTitle>Select date</SelectTitle>
                <CalendarContainer count={2}/>
                <TimePicker/>
            </View>
            <View style={{paddingVertical: 10, paddingHorizontal: styleConfig.screenPadding}}>
                <Button onPress={onPressStartWorking}>Confirm</Button>
            </View>
        </SwipeMenuWrapper>
    )
}


const UseCurrentLocation: React.FC = () => {
    return (
        <ButtonColorCardWithIcon
            labelStyle={{fontFamily: 'IBMPlex-600', color: '#1A579A'}}
            onPress={() => {
            }}
            Icon={LocationSVG} label='Use current location'/>
    )
}

const InputZipCode: React.FC = () => {
    const onChange = () => {

    }
    return (
        <ColorCard style={{flexDirection: 'column', alignItems: 'flex-start', paddingLeft: 15}}>
            <Text style={[styles.selectLocationTitles, {width: 100}]}>Input ZIP code</Text>
            <Input style={{padding: 2, borderColor: '#798293', width: 80}} value={''} placeholder={'Zip code'}
                onChange={onChange}/>
        </ColorCard>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: styleConfig.screenPadding,
        width: '100%',
    },

    selectLocationTitles: {
        color: '#1A579A',
        fontSize: 14,
        lineHeight: 18,
        fontFamily: 'IBMPlex-600',
    },
    menuTitle: {
        fontFamily: 'IBMPlex-600',
        fontSize: 15,
        height: 17,
        fontWeight: '600',
        alignSelf: 'center',
        marginBottom: 25,
        color: '#112A5F',
    },
})

