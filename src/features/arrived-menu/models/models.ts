import {attach, createEffect, createEvent, createStore, sample} from 'effector'
import {Animated, Easing} from 'react-native'
import {useSpring} from '../../../lib/animation-hooks/Hooks'
import {$isAvailable, hideSetAvailable, showSetAvailable} from '../../set-available/models'


export const showArrivedMenuEffect = createEffect<Animated.Value, Promise<any>>((state) => {
    return new Promise((resolve) => {
        setIsMountedArrivedMenu(true)
        setIsOpenedArrivedMenu(true)
        useSpring(state, 1, 4, 6).start(resolve)
    })
})


export const hideArrivedMenuEffect = createEffect<Animated.Value, Promise<any>>(async (state) => {
    return new Promise((resolve) => {
        setIsOpenedArrivedMenu(false)
        useSpring(state, 0, 4, 6).start(resolve)
    })
})

const slideArrivedMenuEffect = createEffect<{ to: number, state: Animated.Value }, Promise<any>>(async ({to, state}) => {
    return new Promise((resolve) => {
        Animated.timing(state, {
            toValue: to,
            duration: 500,
            easing: Easing.bezier(0.2, 0.8, 0.2, 1),
            useNativeDriver: true,
        }).start(resolve)
    })
})


export const setIsMountedArrivedMenu = createEvent<boolean>()
export const setButtonIsDisabled = createEvent<boolean>()
export const slideToBottomArrivedMenu = createEvent()
export const slideToTopArrivedMenu = createEvent()
export const setIsOpenedArrivedMenu = createEvent<boolean>()

export const resetArrivedMenuAnimValue = createEvent()
export const resetIsMountedArrivedAnimValue = createEvent()
export const resetIsOpenedArrivedMenu = createEvent()


export const $arrivedMenuAnimValue = createStore(new Animated.Value(0))
    .reset(resetArrivedMenuAnimValue)


export const $buttonIsDisabled = createStore(false)
    .on(setButtonIsDisabled, (state, payload) => payload)

export const $isMountedArrivedMenu = createStore(false)
    .on(setIsMountedArrivedMenu, (state, payload) => payload)
    .reset(resetIsMountedArrivedAnimValue)


export const $isOpenedArrivedMenu = createStore(false)
    .on(setIsOpenedArrivedMenu, (state, payload) => payload)
    .reset(resetIsOpenedArrivedMenu)


const mountedHandler = sample({
    source: $isAvailable,
    clock: setIsMountedArrivedMenu,
    fn: (isAvailable, isMounted) => ({isMounted, isAvailable}),
})

mountedHandler.watch(({isAvailable, isMounted})=>{
    if (isAvailable && isMounted) {
        hideSetAvailable()
    } else {
        showSetAvailable()
    }
})


export const showArrivedMenu = attach({
    source: $arrivedMenuAnimValue,
    effect: showArrivedMenuEffect,
})


export const hideArrivedMenu = attach({
    source: $arrivedMenuAnimValue,
    effect: hideArrivedMenuEffect,
})

hideArrivedMenu.done.watch(() => {
    setIsMountedArrivedMenu(false)
})

const slideArrivedMenu = attach({
    source: $arrivedMenuAnimValue,
    mapParams: (to: number, state) => ({to, state}),
    effect: slideArrivedMenuEffect,
})


slideToBottomArrivedMenu.watch(async () => {
    await slideArrivedMenu(2)
    setIsOpenedArrivedMenu(false)
})

slideToTopArrivedMenu.watch(() => {
    setIsOpenedArrivedMenu(true)
    slideArrivedMenu(3)
})


