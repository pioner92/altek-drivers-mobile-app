import {createEvent, createStore} from 'effector'
import {Animated, Keyboard} from 'react-native'
import {useSpring, useTiming} from '../../../../utils/animation-hooks/Hooks'

export const showTakePictureMenu = createEvent()
export const hideTakePictureMenu = createEvent()

export const $animValueTakePicture = createStore(new Animated.Value(0))

showTakePictureMenu.watch(() => {
    Keyboard.dismiss()
    useSpring($animValueTakePicture.getState(), 1, 10, 7).start()
})

hideTakePictureMenu.watch(() => {
    useTiming($animValueTakePicture.getState(), 0, 800).start()
})
