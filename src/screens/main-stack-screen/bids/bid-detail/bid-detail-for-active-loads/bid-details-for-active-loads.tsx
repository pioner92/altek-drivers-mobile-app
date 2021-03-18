import React, {useEffect} from 'react'
import {Keyboard, KeyboardAvoidingView, Platform} from 'react-native'
import {loadType} from '../../../../../api/rest/loads/types'
import {StackScreenProps} from '@react-navigation/stack'
import {useStore} from 'effector-react'
import {
    $animatedValueScrollSelectMenu,
    hideScrollSelectMenu,
    showScrollSelectMenu,
} from '../../../../../features/scroll-select-menu/models/models'
import {AlertErrorPlaceBid} from '../features/alert/alert-error-place-bid/alert-error-place-bid'
import {
    $isStartedCounter,
    initCounter,
    startTimer,
    stopTimer,
    TIMER_VALUE,
} from '../../../../../features/button-with-counter/models/models'
import {$sentBidData, setSentBidData} from '../models/models'
import {showPlaceBidErrorModal} from '../features/alert/alert-error-place-bid/models/models'
import {sendBidSocketAction} from '../../../../../api/socket-client/socket-actions/socket-actions'
import {removeBid} from '../../../../../api/rest/bid/remove-bid'
import {getDb, setDb} from '../../../../../lib/db'
import {TIMERBID} from '../../../../../lib/db/constants'
import {LoadLiveTimer} from '../../../../../features/load-live-timer/load-live-timer'
import {BtnWrapper} from '../../../../../ui/atoms/wrapper/btn-wrapper'
import {Button} from '../../../../../ui/atoms/buttons'
import {ButtonWithCounter} from '../../../../../features/button-with-counter/button-with-counter'
import {ScrollSelectMenu} from '../../../../../features/scroll-select-menu/scroll-select-menu'
import {DarkBgAnimated} from '../../../home/available-home/features/dark-bg-animated/dark-bg-animated'
import {BidDetail} from '../features/bid-detail/bid-detail'
import {AlertErrorPlaceMultipleBid} from '../features/alert/alert-error-place-multiple-bid/alert-error-place-multiple-bid'
import {hideAlertCancelBid, showAlertCancelBid} from '../features/alert/alert-cancel-bid/models/models'
import {AlertCancelBid} from '../features/alert/alert-cancel-bid/alert-cancel-bid'
import {showAlertErrorPlaceMultipleBid} from '../features/alert/alert-error-place-multiple-bid/models/models'


type itemType = {
    item: loadType
}

export const BIDLIVETIME = 900

export const BidDetailForActiveLoads: React.FC<StackScreenProps<itemType>> = ({route, navigation}) => {
    const animValueScrollSelectMenu = useStore($animatedValueScrollSelectMenu)
    const sentBidData = useStore($sentBidData)

    const data = route.params as itemType

    const isSentBid = () => {
        return data.item?.id === sentBidData?.id
    }

    const isStartedTimer = useStore($isStartedCounter)

    const bidLiveTimeRemains = () => {
        return BIDLIVETIME - ((Date.now() - Date.parse(data.item.created_date)) / 1000)
    }

    const placeBid = () => {
        if (!isStartedTimer) {
            if (bidLiveTimeRemains() >= 0) {
                showScrollSelectMenu()
            } else {
                showPlaceBidErrorModal()
            }
        } else {
            showAlertErrorPlaceMultipleBid()
        }
    }

    const createYourBidPrice = () => {
        if (isSentBid()) {
            if (sentBidData) {
                return sentBidData.price.toString()
            } else return '0'
        }
        return '0'
    }

    const calculationPricePerMile = () => {
        if (sentBidData?.price) {
            return (sentBidData?.price / data.item?.miles).toFixed(2)
        } else return '0'
    }
    const createPerMilePrice = () => {
        if (isSentBid()) {
            return calculationPricePerMile()
        }
        return '0'
    }

    const onPressPlaceBidInScrollMenu = (value: number) => {
        sendBidSocketAction({load_id: data.item.id, price: value})
        setSentBidData({id: data.item.id, price: value})
    }


    const cancelBid = () => {
        if (!isSentBid() || isStartedTimer) {
            removeBid(data.item.id)
            hideAlertCancelBid()
            stopTimer()
        }
    }

    const onPressCancelBid = () => {
        if (isStartedTimer) {
            showAlertCancelBid()
        }
    }

    const hideKeyboardAndScrollMenu = () => {
        Keyboard.dismiss()
    }


    useEffect(() => {
        if (isStartedTimer) {
            return
        }

        (async function f() {
            const currentTime = Date.now()
            const oldTime = await getDb(TIMERBID)
            if (oldTime) {
                const time = TIMER_VALUE - ((currentTime - Number(oldTime)) / 1000)
                if (time > 0) {
                    initCounter(time)
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
            headerRight: () => <LoadLiveTimer BIDLIVETIME={BIDLIVETIME} date={data.item.created_date}/>,
        })
    }, [])

    return (
        <>
            <KeyboardAvoidingView
                onTouchStart={hideKeyboardAndScrollMenu}
                // @ts-ignore
                behavior={Platform.OS == 'ios' ? 'padding' : null}
                style={{flex: 1, backgroundColor: '#fff'}}
                keyboardVerticalOffset={Platform.OS === 'ios' ? -130 : 0}>
                <BidDetail bidPrice={createYourBidPrice()} perMile={createPerMilePrice()} item={data.item}>
                    <BtnWrapper style={{height: 134, justifyContent: 'space-between'}}>
                        <Button style={{backgroundColor: isStartedTimer ? '#5E7C9C' : '#1672D4'}}
                            disabled={isStartedTimer && isSentBid()} onPress={placeBid}>Place Bid</Button>
                        <ButtonWithCounter isSentBid={isSentBid()} onPress={onPressCancelBid}>
                            Cancel Bid
                        </ButtonWithCounter>
                    </BtnWrapper>
                </BidDetail>
                <DarkBgAnimated animatedValue={animValueScrollSelectMenu}/>
                <ScrollSelectMenu
                    item={data.item}
                    onPressRightButton={onPressPlaceBidInScrollMenu}
                />
            </KeyboardAvoidingView>
            <AlertErrorPlaceBid/>
            <AlertErrorPlaceMultipleBid/>
            <AlertCancelBid onPressYes={cancelBid}/>
        </>
    )
}

// const OpenChat = () => {
//     return (
//         <ButtonColorCardWithIcon
//             theme='gray'
//             label='Discuss this load in chat' onPress={() => {
//             }}
//             Icon={ChatSVG.bind(null, {color: '#798293', size: 17})}/>
//     );
// };

// const ViewLoadOnMap = () => {
//     return (
//         <ButtonColorCardWithIcon
//             label='View load on map'
//             onPress={() => {
//             }}
//             Icon={LocationSVG}/>
//     );
// };


