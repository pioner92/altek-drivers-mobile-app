import {createEvent, createStore} from 'effector'
import {Animated} from 'react-native'


export const setIsMountedConfirmArrivedModal = createEvent<boolean>()
export const setAccepted = createEvent<boolean>()

export const $isMountedConfirmArrivedModal = createStore(false)
    .on(setIsMountedConfirmArrivedModal, ((state, payload) => payload))

export const $isAccepted = createStore(false)
    .on(setAccepted, ((state, payload) => payload))

export const $confirmArrivedAnimValue = createStore(new Animated.Value(0))


