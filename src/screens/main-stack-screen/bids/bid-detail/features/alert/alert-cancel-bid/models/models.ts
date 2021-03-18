import {attach, createEvent, createStore} from 'effector'
import {Animated} from 'react-native'
import {startAlertAnimationEffect} from '../../models/models'


export const showAlertCancelBid = createEvent()
export const hideAlertCancelBid = createEvent()

export const setIsMountedAlertCancelBid = createEvent<boolean>()

export const $animValueAlertCancelBid = createStore(new Animated.Value(0))

export const $isMountedAlertCancelBid = createStore(false)
    .on(setIsMountedAlertCancelBid, (state, payload) => payload)

const startAnimation = attach({
    source: $animValueAlertCancelBid,
    effect: startAlertAnimationEffect,
    mapParams: (to: number, state) => ({state, to}),
})

showAlertCancelBid.watch(() => {
    setIsMountedAlertCancelBid(true)
    startAnimation(1)
})

hideAlertCancelBid.watch(() => {
    setIsMountedAlertCancelBid(false)
    startAnimation(0)
})
