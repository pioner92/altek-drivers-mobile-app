import {createEvent, createStore} from "effector";
import {Animated} from "react-native";

export const setIsMountedCongratulationModal = createEvent<boolean>()

export const $animValueCongratulationModal = createStore(new Animated.Value(0))

export const $isMountedCongratulationModal = createStore(false)
    .on(setIsMountedCongratulationModal,(state, payload) => payload)
