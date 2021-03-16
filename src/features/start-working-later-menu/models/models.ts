import {createEvent, createStore, sample} from 'effector'
import {Animated} from 'react-native'
import {useSpring} from '../../../lib/animation-hooks/Hooks'


const startAnimation = createEvent<number>()

export const showStartWorkingLaterMenu = startAnimation.prepend(()=> 1)
export const hideStartWorkingLaterMenu = startAnimation.prepend(()=> 0)

export const $startWorkingLaterAnimValue = createStore(new Animated.Value(0))


const handler = sample({
    source: $startWorkingLaterAnimValue,
    clock: startAnimation,
    fn: (state, to) => ({state, to}),
})

handler.watch(({state, to})=> {
    useSpring(state, to, 10, 7).start()
})
