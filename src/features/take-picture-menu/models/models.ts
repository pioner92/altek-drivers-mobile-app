import {createEvent, createStore, sample} from 'effector'
import {Animated, Keyboard} from 'react-native'
import {useSpring} from '../../../lib/animation-hooks/Hooks'

export const startAnimation = createEvent<number>()

export const showTakePictureMenu = startAnimation.prepend(()=> 1)
export const hideTakePictureMenu = startAnimation.prepend(()=> 0)

export const $animValueTakePicture = createStore(new Animated.Value(0))


const handler = sample({
    source: $animValueTakePicture,
    clock: startAnimation,
    fn: (state, to) => ({state, to}),
})

handler.watch(({state, to})=>{
    if (to === 1) {
        Keyboard.dismiss()
    }
    useSpring(state, to, 10, 7).start()
})

