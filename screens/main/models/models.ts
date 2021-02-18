import {createStore,createEvent} from "effector";
import {Animated} from "react-native";
import {useInterpolate, useSpring} from "../../../utils/animation-hooks/Hooks";

export const setIsWaitingResult = createEvent<boolean>()


export const $isWaitingResult = createStore(false)
.on(setIsWaitingResult,((state, payload) => payload))




