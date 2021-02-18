import {createEvent,createStore} from "effector";
import {Animated} from "react-native";
import {useSpring, useTiming} from "../../../../utils/animation-hooks/Hooks";

export const showBidList = createEvent()
export const hideBidList = createEvent()
export const setIsMountedBidList = createEvent<boolean>()
export const unmount = createEvent()


export const $animValueBidList = createStore(new Animated.Value(0))

export const $isMountedBIdList = createStore(false)
    .on(setIsMountedBidList,((state, payload) => payload))

showBidList.watch(()=>{
    setIsMountedBidList(true)
    useSpring($animValueBidList.getState(),1,10,5).start()
})

hideBidList.watch(()=>{
    useTiming($animValueBidList.getState(),0,800).start(()=>{
        setIsMountedBidList(false)
    })
})

$isMountedBIdList.watch(state => !state && unmount())

$animValueBidList.off(unmount)
$isMountedBIdList.off(unmount)
