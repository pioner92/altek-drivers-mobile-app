import {attach, createEffect, createEvent, createStore} from 'effector'
import {Animated} from 'react-native'
import {useSpring} from '../../../../../../../lib/animation-hooks/Hooks'


const startAnimationEffect = createEffect<{ state: Animated.Value, to: number }, Promise<null>>(async ({state, to}) => {
    return new Promise((resolve) => {
        useSpring(state, to, 10, 7).start(() => resolve())
    })
})

export const showPlaceBidErrorModal = createEvent()
export const hidePlaceBidErrorModal = createEvent()
export const setIsMountedPlaceBidErrorModal = createEvent<boolean>()


export const $animValuePlaceBidErrorModal = createStore(new Animated.Value(0))
export const $isMountedPlaceBidErrorModal = createStore(false)
    .on(setIsMountedPlaceBidErrorModal, (state, payload) => payload)


const startAnimation = attach({
    source: $animValuePlaceBidErrorModal,
    effect: startAnimationEffect,
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
