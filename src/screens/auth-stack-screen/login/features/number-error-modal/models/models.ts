import {attach, createEffect, createEvent, createStore} from 'effector'
import {Animated} from 'react-native'
import {useSpring} from '../../../../../../../utils/animation-hooks/Hooks'

export const startAnimationEffect = createEffect<{ state: Animated.Value, to: number }, Promise<null>>(async ({state, to}) => {
    return new Promise((resolve) => {
        useSpring(state, to, 10, 7).start(() => resolve())
    })
})

export const showNumberErrorModal = createEvent()
export const hideNumberErrorModal = createEvent()
export const setIsMountedNumberErrorModal = createEvent<boolean>()


export const $animValueNumberErrorModal = createStore(new Animated.Value(0))
export const $isMountedNumberErrorModal = createStore(false)
    .on(setIsMountedNumberErrorModal, (state, payload) => payload)


const startAnimation = attach({
    source: $animValueNumberErrorModal,
    effect: startAnimationEffect,
    mapParams: (to: number, state) => ({state, to}),
})

showNumberErrorModal.watch(() => {
    setIsMountedNumberErrorModal(true)
    startAnimation(1)
})

hideNumberErrorModal.watch(async () => {
    await startAnimation(1)
    setIsMountedNumberErrorModal(false)
})
