import {attach, createEvent, createStore} from 'effector'
import {Animated} from 'react-native'
import {startAlertAnimationEffect} from '../../models/models'


export const showPlaceBidErrorModal = createEvent()
export const hidePlaceBidErrorModal = createEvent()
export const setIsMountedPlaceBidErrorModal = createEvent<boolean>()


export const $animValuePlaceBidErrorModal = createStore(new Animated.Value(0))
export const $isMountedPlaceBidErrorModal = createStore(false)
    .on(setIsMountedPlaceBidErrorModal, (state, payload) => payload)


const startAnimation = attach({
    source: $animValuePlaceBidErrorModal,
    effect: startAlertAnimationEffect,
    mapParams: (to: number, state) => ({state, to}),
})

showPlaceBidErrorModal.watch(() => {
    setIsMountedPlaceBidErrorModal(true)
    startAnimation(1)
})

hidePlaceBidErrorModal.watch(async () => {
    await startAnimation(1)
    setIsMountedPlaceBidErrorModal(false)
})
