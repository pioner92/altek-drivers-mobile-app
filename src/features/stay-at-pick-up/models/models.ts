import {attach, createEffect, createEvent, createStore} from 'effector'
import {Animated} from 'react-native'
import {useSpring} from '../../../../utils/animation-hooks/Hooks'
import {showArrivedMenu} from '../../arrived-menu/models'


export const setIsMountedStayAtPickUpMenu = createEvent<boolean>()
export const showStayAtPickUpMenu = createEvent()
export const hideStayAtPickUpMenu = createEvent()


const startAnimationEffect = createEffect<{ state: Animated.Value, to: number }, Promise<null>>(async ({state, to}) => {
    return new Promise((resolve) => {
        useSpring(state, to, 10, 5).start(() => resolve())
    })
})

export const $isMounted = createStore(false)
    .on(setIsMountedStayAtPickUpMenu, ((state, payload) => payload))

export const $stayAtPickUpAnimValue = createStore(new Animated.Value(0))


const startAnimation = attach({
    source: $stayAtPickUpAnimValue,
    mapParams: (to: number, state) => ({to, state}),
    effect: startAnimationEffect,
})

showStayAtPickUpMenu.watch(() => {
    setIsMountedStayAtPickUpMenu(true)
    showArrivedMenu()
    startAnimation(1)
})

hideStayAtPickUpMenu.watch(async () => {
    await startAnimation(0)
    setIsMountedStayAtPickUpMenu(false)
})


