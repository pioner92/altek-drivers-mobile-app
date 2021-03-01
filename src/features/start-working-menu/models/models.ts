import {createEvent, createStore} from 'effector'
import {Animated} from 'react-native'
import {useSpring, useSpringAsync} from '../../../../utils/animation-hooks/Hooks'


export const showStartWorkingMenu = createEvent()
export const hideStartWorkingMenu = createEvent()
export const setIsMountedStartWorkingMenu = createEvent<boolean>()

export const $animValueStartWorkingMenu = createStore(new Animated.Value(0))


export const $isMountedStartWorkingMenu = createStore(false)
    .on(setIsMountedStartWorkingMenu, (_, payload) => payload)


showStartWorkingMenu.watch(() => {
    setIsMountedStartWorkingMenu(true)
    useSpring($animValueStartWorkingMenu.getState(), 1, 10, 7).start()
})

hideStartWorkingMenu.watch(async () => {
    await useSpringAsync($animValueStartWorkingMenu.getState(), 0, 10, 7)
    setIsMountedStartWorkingMenu(false)
})
