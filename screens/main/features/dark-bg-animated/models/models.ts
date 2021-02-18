import {createEvent, createStore} from "effector";
import {Animated} from "react-native";
import {useTiming} from "../../../../../utils/animation-hooks/Hooks";
import {$arrivedMenuAnimValue} from "../../../../../src/features/arrived-menu/models";

export const showDarkBGAnimated = createEvent()
export const hideDarkBGAnimated = createEvent()

const setIsMountedDarkBGAnimated = createEvent<boolean>()

export const $animValueDarkBGAnimated = createStore(new Animated.Value(0))

export const $isMountedDarkBGAnimated = createStore(false)
    .on(setIsMountedDarkBGAnimated,(state, payload) => payload)

showDarkBGAnimated.watch(()=>{
    setIsMountedDarkBGAnimated(true)
    useTiming($arrivedMenuAnimValue.getState(),1,500).start()
})

hideDarkBGAnimated.watch(()=>{
    useTiming($arrivedMenuAnimValue.getState(),0,500).start(()=>{
        setIsMountedDarkBGAnimated(false)
    })
})
