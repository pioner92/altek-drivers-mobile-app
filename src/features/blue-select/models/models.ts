import {createEvent, createStore} from 'effector'
import {Animated} from 'react-native'
import {useSpring} from '../../../../utils/animation-hooks/Hooks'


export const openBlueSelect = createEvent()
export const closeBlueSelect = createEvent()

export const $animValueBlueSelect = createStore(new Animated.Value(0))

openBlueSelect.watch(() => {
    useSpring($animValueBlueSelect.getState(), 1, 10, 7).start()
})

closeBlueSelect.watch(() => {
    useSpring($animValueBlueSelect.getState(), 0, 10, 7).start()
})
