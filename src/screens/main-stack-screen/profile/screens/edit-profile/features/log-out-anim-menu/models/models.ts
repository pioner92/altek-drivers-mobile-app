import {createEvent, createStore} from 'effector'
import {Animated} from 'react-native'
import {useSpring} from '../../../../../../../../utils/animation-hooks/Hooks'

export const showLogOutAnimMenu = createEvent()
export const hideLogOutAnimMenu = createEvent()
export const setIsMountedLogOutAnimMenu = createEvent<boolean>()

export const $animValueLogOutAnimMenu = createStore(new Animated.Value(0))
export const $isMountedLogOutAnimMenu = createStore(false)
    .on(setIsMountedLogOutAnimMenu, (state, payload) => payload)


showLogOutAnimMenu.watch(() => {
    setIsMountedLogOutAnimMenu(true)
    startAnimation(1)
})
hideLogOutAnimMenu.watch(() => {
    startAnimation(0, () => setIsMountedLogOutAnimMenu(false))
})


function startAnimation(value: number, callback?: () => void) {
    useSpring($animValueLogOutAnimMenu.getState(), value, 15, 15).start(() => {
        callback && callback()
    })
}
