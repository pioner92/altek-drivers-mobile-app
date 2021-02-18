import {createEvent,createStore} from "effector";
import {Animated} from "react-native";
import {useSpring} from "../../../../../utils/animation-hooks/Hooks";

export const showNumberErrorModal = createEvent()
export const hideNumberErrorModal = createEvent()
export const setIsMountedNumberErrorModal = createEvent<boolean>()


export const $animValueNumberErrorModal = createStore(new Animated.Value(0))
export const $isMountedNumberErrorModal = createStore(false)
    .on(setIsMountedNumberErrorModal,(state, payload) => payload)


showNumberErrorModal.watch(()=>{
    setIsMountedNumberErrorModal(true)
    useSpring($animValueNumberErrorModal.getState(),1,10,7).start()
})

hideNumberErrorModal.watch(()=>{
    useSpring($animValueNumberErrorModal.getState(),0,10,5).start(()=>{
        setIsMountedNumberErrorModal(false)
    })
})
