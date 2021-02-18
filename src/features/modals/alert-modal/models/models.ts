import {createEvent} from "effector";
import {Animated} from "react-native";
import {useSpring, useTiming} from "../../../../../utils/animation-hooks/Hooks";

type callback = ()=>void
type callbackPromise = ()=>Promise<void>

type hideAlertModalType = {
    value:Animated.Value,
    callback:callback |callbackPromise
}

export const showAlertModal = createEvent<Animated.Value>()
export const hideAlertModal = createEvent<hideAlertModalType>()


showAlertModal.watch(payload => {
    useSpring(payload,1,10,7).start()
})

hideAlertModal.watch(({value,callback}) => {
    useTiming(value,0,200).start(callback)
})
