import React from 'react';
import {useInterpolate} from "../../../utils/animation-hooks/Hooks";
import {alertFn} from "../../../utils/alert/alert";
import {useStore} from "effector-react";
import {$arrivedMenuAnimValue} from "./models";
import {useNavigate} from "../../lib/hooks";
import links from '../../../links.json'
import { $buttonIsDisabled, $isOpenedArrivedMenu, slideToTopArrivedMenu} from "./models/models";
import {Animated, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {styleConfig} from "../../StyleConfig";
import {Wrapper} from "../../ui/atoms/wrapper";
import {ButtonColorCardWithIcon} from "../../ui/molecules/button-color-card-with-icon";
import {ChatSVG, SendSVG} from "../../ui/atoms/icons";
import {GrayAreaWithTitle, Header} from "./ui/moleculs";
import {Button} from "../../ui/atoms/buttons";
import {VALUEINSTEAD} from "../../lib/nullableDateValidate/nullableDateValidate";

import {sendGeoToServer} from "../../api/rest/send-geo-to-server";
import {DateTime} from "luxon";
import {dateConverter} from "../../../utils/date-converter";

type propsType = {
    accept: () => void
    address: string
    date: string
    btnLabel: string
    title: string
    dateTitle: string
}

export const ArrivedMenu: React.FC<propsType> = ({accept, btnLabel, address, date, title, dateTitle}) => {

    let dateFormatted = 'Direct'
    if (date) {
        "2021-12-02T15:30:00-05:00"
        dateFormatted = DateTime.fromISO(date,{setZone:false}).toFormat("EEEE dd MMMM hh:mm a")
    }


    const value = useStore($arrivedMenuAnimValue)
    const isOpenedMenu = useStore($isOpenedArrivedMenu)
    const navigate = useNavigate()
    const menuInterpolateY = useInterpolate(value, [0, 1, 2, 3], [500, 0, 250, 0])
    const buttonIsDisabled = useStore($buttonIsDisabled)

    const onClickAccept = () => {
        accept()
        sendGeoToServer()
    }


    const loadChat = () => {
        alertFn({
            title: 'Good to go', message: 'You have been manually released by dispatcher.', callback: () => {
            }
        })
    }
    const showRoute = () => {
    }

    const showInfo = () => navigate(links.loadInfo)


    const animStyle = {
        transform: [
            {translateY: menuInterpolateY}
        ]
    }
    return (
        <Animated.View style={[styles.container, animStyle, styleConfig.shadowModal]}>
            <TouchableOpacity disabled={isOpenedMenu}  onPress={() => !isOpenedMenu ? slideToTopArrivedMenu() : null}>
                <Header onPress={showInfo}>{title}</Header>
            </TouchableOpacity>
            <Wrapper>
                {/* временно */}
                <View style={{height: 10, width: '100%'}}></View>
                {/*<ButtonsColorCardWithIcon*/}
                {/*    style={{marginVertical:20,width:244}}*/}
                {/*    LeftComponent={LoadChat}*/}
                {/*    RightComponent={ShowRoute}*/}
                {/*/>*/}
                <GrayAreaWithTitle style={{marginBottom: 16}} title={dateTitle}>
                    <Text style={styles.informationText}>{dateFormatted}
                        {dateFormatted !== VALUEINSTEAD &&
                        <Text style={{color: '#798293'}}> (local)</Text>
                        }
                    </Text>
                </GrayAreaWithTitle>
                <GrayAreaWithTitle style={{marginBottom: 20}} title='Destination address'>
                    <Text style={styles.informationText}>{address}</Text>
                </GrayAreaWithTitle>
                <Button disabled={buttonIsDisabled} onPress={onClickAccept}>{btnLabel}</Button>
            </Wrapper>
        </Animated.View>
    );
};


const LoadChat = () => {
    return (
        <ButtonColorCardWithIcon
            style={{height: 38}}
            onPress={() => {
            }}
            Icon={ChatSVG.bind(null, {color: '#1A579A', size: 14})}
            label='Load chat'/>
    )
}
const ShowRoute = () => {
    return (
        <ButtonColorCardWithIcon
            style={{height: 38}}
            onPress={() => {
            }}
            Icon={SendSVG.bind(null, {color: '#1A579A', size: 14})}
            label='Show route'/>
    )
}

const styles = StyleSheet.create({
    container: {
        zIndex: 4,
        elevation: 4,
        backgroundColor: '#fff',
        height: 320, //392
        width: '100%',
        position: "absolute",
        bottom: 50,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    informationText: {
        color: styleConfig.textColor.dark,
        fontSize: 14,
        fontFamily: 'IBMPlex-500',
        lineHeight: 18
    },
    buttonContainer: {
        flexDirection: 'row',
        width: 244,
        justifyContent: 'space-between',
        paddingTop: 16,
        paddingBottom: 21
    }
})
