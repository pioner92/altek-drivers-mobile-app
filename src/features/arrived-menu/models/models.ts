import {createEffect, createEvent, createStore} from 'effector'
import {Animated, Easing} from 'react-native'
import {useSpring} from '../../../../utils/animation-hooks/Hooks'
import {$isAvailable, hideSetAvailable, showSetAvailable} from '../../set-available/models'


export const showArrivedMenu = createEffect(() => {
    return new Promise((resolve) => {
        setIsMountedArrivedMenu(true)
        setIsOpenedArrivedMenu(true)
        useSpring($arrivedMenuAnimValue.getState(), 1, 4, 6).start(resolve)
    })
})
export const hideArrivedMenu = createEffect(async () => {
    return new Promise((resolve) => {
        setIsOpenedArrivedMenu(false)
        useSpring($arrivedMenuAnimValue.getState(), 0, 4, 6).start(resolve)
    })
})
export const setIsMountedArrivedMenu = createEvent<boolean>()
export const setButtonIsDisabled = createEvent<boolean>()
export const setArrivedMenuOffset = createEvent<number>()
export const slideToBottomArrivedMenu = createEvent()
export const slideToTopArrivedMenu = createEvent()
export const setIsOpenedArrivedMenu = createEvent<boolean>()

export const resetArrivedMenuAnimValue = createEvent()
export const resetIsMountedArrivedAnimValue = createEvent()
export const resetIsOpenedArrivedMenu = createEvent()

export const $arrivedMenuAnimValue = createStore(new Animated.Value(0))
    .reset(resetArrivedMenuAnimValue)

export const $buttonIsDisabled = createStore(false)
    .on(setButtonIsDisabled, ((state, payload) => payload))

export const $isMountedArrivedMenu = createStore(false)
    .on(setIsMountedArrivedMenu, ((state, payload) => payload))
    .reset(resetIsMountedArrivedAnimValue)


export const $arrivedMenuOffset = createStore(0)
    .on(setArrivedMenuOffset, (state, payload) => {
        return payload
    })


export const $isOpenedArrivedMenu = createStore(false)
    .on(setIsOpenedArrivedMenu, (state, payload) => payload)
    .reset(resetIsOpenedArrivedMenu)


setIsMountedArrivedMenu.watch((payload) => {
    if (payload && $isAvailable.getState()) {
        hideSetAvailable()
    } else {
        showSetAvailable()
    }
})


hideArrivedMenu.done.watch(() => {
    setIsMountedArrivedMenu(false)
})

slideToBottomArrivedMenu.watch(() => {
    // useSpring($arrivedMenuAnimValue.getState(), 2, 10, 6).start()
    Animated.timing($arrivedMenuAnimValue.getState(), {
        toValue: 2,
        duration: 500,
        easing: Easing.bezier(0.2, 0.8, 0.2, 1),
        useNativeDriver: true,
    }).start()
    setIsOpenedArrivedMenu(false)
})

slideToTopArrivedMenu.watch(() => {
    setIsOpenedArrivedMenu(true)
    Animated.timing($arrivedMenuAnimValue.getState(), {
        toValue: 3,
        duration: 500,
        easing: Easing.bezier(0.2, 0.8, 0.2, 1),
        useNativeDriver: true,
    }).start()
    // useSpring($arrivedMenuAnimValue.getState(), 3, 10, 5).start()
})
