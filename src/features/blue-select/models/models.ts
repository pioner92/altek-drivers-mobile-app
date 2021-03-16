import {createEvent, createStore, sample} from 'effector'
import {Animated} from 'react-native'
import {useSpring} from '../../../lib/animation-hooks/Hooks'


const startAnimation = createEvent<number>()

export const openBlueSelect = startAnimation.prepend(()=> 1)
export const closeBlueSelect = startAnimation.prepend(()=> 0)

export const $animValueBlueSelect = createStore(new Animated.Value(0))


const handler = sample({
    source: $animValueBlueSelect,
    clock: startAnimation,
    fn: (state, value) => ({state, value}),
})

handler.watch(({state, value}) => {
    useSpring(state, value, 10, 7).start()
})

