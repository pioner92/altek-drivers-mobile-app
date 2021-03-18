import {attach, createEvent, createStore} from 'effector'
import {Animated} from 'react-native'
import {startAlertAnimationEffect} from '../../models/models'


export const showAlertErrorPlaceMultipleBid = createEvent()
export const hideAlertErrorPlaceMultipleBid = createEvent()
export const setIsMountedAlertErrorPlaceMultipleBid = createEvent<boolean>()

export const $animValueAlertErrorPlaceMultipleBid = createStore(new Animated.Value(1))

export const $isMountedAlertErrorPlaceMultipleBid = createStore(false)
    .on(setIsMountedAlertErrorPlaceMultipleBid,(state, payload) => payload)


const startAnimation = attach({
    effect: startAlertAnimationEffect,
    source: $animValueAlertErrorPlaceMultipleBid,
    mapParams: (to: number, state) => ({state, to}),
})

showAlertErrorPlaceMultipleBid.watch(()=>{
    setIsMountedAlertErrorPlaceMultipleBid(true)
    startAnimation(1)
})

hideAlertErrorPlaceMultipleBid.watch(async ()=>{
    await startAnimation(0)
    setIsMountedAlertErrorPlaceMultipleBid(false)
})
