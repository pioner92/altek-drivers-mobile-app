import {createEffect} from 'effector'
import {Animated} from 'react-native'
import {useSpring} from '../../../../../../../lib/animation-hooks/Hooks'

export const startAlertAnimationEffect = createEffect<{ state: Animated.Value, to: number }, Promise<null>>(async ({state, to}) => {
    return new Promise((resolve) => {
        useSpring(state, to, 10, 7).start(() => resolve())
    })
})
