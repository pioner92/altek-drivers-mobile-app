import {createEvent, createStore} from 'effector'
import {Animated} from 'react-native'
import {useSpring} from '../../../../../../../../utils/animation-hooks/Hooks'

export const showPlaceBidErrorModal = createEvent()
export const hidePlaceBidErrorModal = createEvent()
export const setIsMountedPlaceBidErrorModal = createEvent<boolean>()


export const $animValuePlaceBidErrorModal = createStore(new Animated.Value(0))
export const $isMountedPlaceBidErrorModal = createStore(false)
    .on(setIsMountedPlaceBidErrorModal, (state, payload) => payload)

showPlaceBidErrorModal.watch(() => {
    setIsMountedPlaceBidErrorModal(true)
    useSpring($animValuePlaceBidErrorModal.getState(), 1, 10, 7).start()
})

hidePlaceBidErrorModal.watch(() => {
    useSpring($animValuePlaceBidErrorModal.getState(), 0, 10, 7).start(() => {
        setIsMountedPlaceBidErrorModal(false)
    })
})
