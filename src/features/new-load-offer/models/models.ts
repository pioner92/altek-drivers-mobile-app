import {createStore,createEvent} from 'effector'
import {Animated} from "react-native";
import {useSpring, useTiming} from "../../../../utils/animation-hooks/Hooks";

export const setIsMountedNewLoadOfferMenu = createEvent<boolean>()
export const setIsNewLoadOffer = createEvent<boolean>()

export const $isMountedNewLoadOfferMenu = createStore(false)
    .on(setIsMountedNewLoadOfferMenu,(_,payload)=>payload)

export const $isNewLoadOfferStore = createStore(false)

export const showNewLoadOfferMenu = createEvent()
export const hideNewLoadOfferMenu = createEvent()

export const $newLoadOfferAnimValue = createStore(new Animated.Value(0))


showNewLoadOfferMenu.watch(()=>{
    setIsMountedNewLoadOfferMenu(true)
    useSpring($newLoadOfferAnimValue.getState(),1,10,5).start()
})

hideNewLoadOfferMenu.watch(()=>{
    useTiming($newLoadOfferAnimValue.getState(),0,800).start(()=>{
        setIsMountedNewLoadOfferMenu(false)
    })
})
