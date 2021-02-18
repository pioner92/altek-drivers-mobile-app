import {createStore,createEvent} from 'effector'
import {Animated} from "react-native";

export const setIsMountedUnavailableModal = createEvent<boolean>()

export const $animValueUnavailableModal = createStore(new Animated.Value(0))

export const $isMountedUnavailableModal = createStore(false)
    .on(setIsMountedUnavailableModal,((state, payload) => payload))

