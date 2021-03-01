import {createEvent, createStore} from 'effector'
import {Animated} from 'react-native'

export const setIsMountedConfirmationFromDispatcherModal = createEvent<boolean>()

export const $animValueConfirmationFromDispatcherModal = createStore(new Animated.Value(0))

export const $isMountedConfirmationFromDispatcherModal = createStore(false)
    .on(setIsMountedConfirmationFromDispatcherModal, (state, payload) => payload)

