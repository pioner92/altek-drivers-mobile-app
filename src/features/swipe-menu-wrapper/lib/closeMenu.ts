import {Animated} from 'react-native'
import {useTiming} from '../../../lib/animation-hooks/Hooks'


export const closeMenu = (value: Animated.Value, callback?: () => void) => {
    useTiming(value, 0, 800).start(callback)
}
