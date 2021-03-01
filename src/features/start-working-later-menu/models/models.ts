import {createEvent, createStore} from 'effector'
import {Animated} from 'react-native'
import {useSpring} from '../../../../utils/animation-hooks/Hooks'

export const showStartWorkingLaterMenu = createEvent()
export const hideStartWorkingLaterMenu = createEvent()

export const $startWorkingLaterAnimValue = createStore(new Animated.Value(0))

showStartWorkingLaterMenu.watch(() => {
    useSpring($startWorkingLaterAnimValue.getState(), 1, 10, 7).start()
})

hideStartWorkingLaterMenu.watch(() => {
    useSpring($startWorkingLaterAnimValue.getState(), 0, 10, 7).start()
})
