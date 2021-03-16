import {Animated} from 'react-native'
import {useTiming} from '../../../lib/animation-hooks/Hooks'

type propsType = {
    value: Animated.Value
}

export const closeLoadMenu = ({value}: propsType) => {
    useTiming(value, 0, 800).start()
}
