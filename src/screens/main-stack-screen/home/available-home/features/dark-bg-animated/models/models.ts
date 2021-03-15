import {createEvent, createStore} from 'effector'
import {Animated} from 'react-native'

export const showDarkBGAnimated = createEvent()
export const hideDarkBGAnimated = createEvent()

const setIsMountedDarkBGAnimated = createEvent<boolean>()

export const $animValueDarkBGAnimated = createStore(new Animated.Value(0))

export const $isMountedDarkBGAnimated = createStore(false)
    .on(setIsMountedDarkBGAnimated, (state, payload) => payload)

showDarkBGAnimated.watch(() => {
    setIsMountedDarkBGAnimated(true)
})

hideDarkBGAnimated.watch(() => {
    setIsMountedDarkBGAnimated(false)
})
