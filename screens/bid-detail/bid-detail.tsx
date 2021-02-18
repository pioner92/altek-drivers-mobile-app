import React, {useEffect, useState} from 'react';
import {Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View} from "react-native";
import {ScreenWrapper} from "../../src/ui/atoms/screen-wrapper/screen-wrapper";
import {BtnWrapper} from "../../src/ui/atoms/wrapper/btn-wrapper";
import {Button} from "../../src/ui/atoms/buttons";
import {InfoCard} from "../../src/features/bids-info/info-card";
import {StackScreenProps, useHeaderHeight} from "@react-navigation/stack";
import {loadType} from "../../src/api/rest/loads/get-loads";
import {Notes} from "../../src/features/bids-info/ui/atoms";
import {PriceAreaComponent} from "../../src/features/bids-info/ui/molecules";
import {styleConfig} from "../../src/StyleConfig";
import {DetailCard} from "../../src/features/bids-info/detail-card";
import {ChatSVG} from "../../src/ui/atoms/icons";
import {ButtonColorCardWithIcon} from "../../src/ui/molecules/button-color-card-with-icon";
import {LocationSVG} from "../../src/ui/atoms/icons/location-svg";
import {ButtonWithCounter} from "../../src/features/button-with-counter/button-with-counter";
import {useStore} from "effector-react";
import {
    $isStartedCounter,
    setCounter,
    startTimer,
    TIMER_VALUE
} from "../../src/features/button-with-counter/models/models";
import {removeBid} from "../../src/api/rest/bid/remove-bid";
import {ScrollSelectMenu} from "../../src/features/scroll-select-menu/scroll-select-menu";
import {
    hideScrollSelectMenu,
    showScrollSelectMenu
} from "../../src/features/scroll-select-menu/models/models";
import {getDb, setDb} from "../../utils/db";
import {TIMERBID} from "../../utils/db/constants";
import {$sentBidData, setSentBidData} from "./models/models";
import moment from "moment";
import {useTimer} from "../../hooks/useTimer";
import {PlaceBidErrorModal} from "./features/placeBidErrorModal/placeBidErrorModal";
import {showPlaceBidErrorModal} from "./features/placeBidErrorModal/models/models";
import {sendBidSocketAction} from "../../src/api/socket-client/socket-actions/socket-actions";


type itemType = {
    item: loadType
}

export const BidDetail: React.FC<StackScreenProps<itemType>> = ({route, navigation}) => {

    const BIDLIVETIME = 900

    const data = route.params as itemType

    const isStartedTimer = useStore($isStartedCounter)
    const sentBidData = useStore($sentBidData)

    const bidLiveTimeRemains = () => {
        return BIDLIVETIME - ((Date.now() - Date.parse(data.item.created_date)) / 1000)
    }
    const [timeValue, setTimeValue] = useState(bidLiveTimeRemains())


    const placeBid = () => {
        if (!isStartedTimer) {
            if (bidLiveTimeRemains() >= 0) {
                showScrollSelectMenu()
            } else {
                showPlaceBidErrorModal()
            }
        }
    }

    const onPressPlaceBidInScrollMenu = (value: number) => {
        sendBidSocketAction({load_id: data.item.id, price: value})
        setSentBidData({id: data.item.id, price: value})
    }

    const calculationPricePerMile = () => {
        if (sentBidData?.price) {
            return (sentBidData?.price / data.item.miles).toFixed(2)
        } else return "0"
    }

    const cancelBid = () => {
        if (!isStartedTimer) {
            removeBid(data.item.id)
        }
    }

    const isSentBid = () => {
        return data.item.id === sentBidData?.id
    }

    const createYourBidPrice = () => {
        if (isSentBid()) {
            if (sentBidData) {
                return sentBidData.price.toString()
            } else return "0"
        }
        return "0"
    }

    const createPerMilePrice = () => {
        if (isSentBid()) {
            return calculationPricePerMile()
        }
        return "0"
    }

    const headerTimer = () => {
        if (timeValue >= 0) {
            return moment.unix(timeValue).format('mm:ss')
        } else return '00:00'
    }

    const hideKeyboardAndScrollMenu =() => {
        Keyboard.dismiss()
    }

    useTimer(() => setTimeValue(bidLiveTimeRemains()))

    useEffect(() => {
        if (isStartedTimer) {
            return
        }

        (async function () {
            const currentTime = Date.now()
            const oldTime = await getDb(TIMERBID)
            if (oldTime) {
                const time = TIMER_VALUE - ((currentTime - Number(oldTime)) / 1000)
                if (time > 0) {
                    setCounter(time)
                    startTimer()
                } else {
                    setDb(TIMERBID, '')
                }
            }
        })()
        return () => hideScrollSelectMenu()

    }, [])

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (<Text
                style={{
                    marginRight: 16,
                    color: '#FF4869',
                    fontSize: 12,
                    fontFamily: 'IBMPlex-500',
                    lineHeight: 16
                }}>{headerTimer()}</Text>)
        })
    }, [timeValue])

    return (
        <>
            <KeyboardAvoidingView
                onTouchStart={hideKeyboardAndScrollMenu}
                //@ts-ignore
                behavior={Platform.OS == "ios" ? "padding" : null}
                style={{flex: 1, backgroundColor: '#fff'}}
                keyboardVerticalOffset={Platform.OS === "ios" ? -130 : 0}
            >
                <ScreenWrapper style={styles.container}>

                    <ScrollView contentContainerStyle={{
                        paddingTop: 27,
                        paddingBottom: 40,
                        paddingHorizontal: styleConfig.screenPadding
                    }}>

                        <InfoCard data={data.item}/>
                        <Notes notes={data.item?.note}/>
                        <View style={styles.priceAreasWrapper}>
                            <PriceAreaComponent value={createYourBidPrice()} description='Your bid'/>
                            <View style={{width: 16}}/>
                            <PriceAreaComponent value={createPerMilePrice()} description='Per mile'/>
                        </View>
                        <DetailCard data={data.item}/>
                        {/*<ButtonsColorCardWithIcon style={{marginTop:26}} LeftComponent={OpenChat} RightComponent={ViewLoadOnMap}/>*/}
                    </ScrollView>
                    <BtnWrapper style={{height: 149, justifyContent: "space-between"}}>
                        <Button disabled={isStartedTimer} onPress={placeBid}>Place Bid</Button>
                        <ButtonWithCounter onPress={cancelBid}/>
                    </BtnWrapper>
                </ScreenWrapper>
                <ScrollSelectMenu
                    item={data.item}
                    onPressRightButton={onPressPlaceBidInScrollMenu}
                />
            </KeyboardAvoidingView>

            <PlaceBidErrorModal/>
        </>
    );
};

const OpenChat = () => {
    return (
        <ButtonColorCardWithIcon
            theme='gray'
            label='Discuss this load in chat' onPress={() => {
        }}
            Icon={ChatSVG.bind(null, {color: '#798293', size: 17})}/>
    )
}

const ViewLoadOnMap = () => {
    return (
        <ButtonColorCardWithIcon
            label='View load on map'
            onPress={() => {
            }}
            Icon={LocationSVG}/>
    )
}

const styles = StyleSheet.create({
    container: {},
    priceAreasWrapper: {
        flexDirection: "row",
        height: 100,
        marginTop: 26
    },
})
