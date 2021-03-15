import {attach, createEffect, createEvent, createStore} from 'effector'
import {Animated} from 'react-native'
import {useSpring,} from '../../../../utils/animation-hooks/Hooks'


export const showStartWorkingMenu = createEvent()
export const hideStartWorkingMenu = createEvent()
export const setIsMountedStartWorkingMenu = createEvent<boolean>()


export const startAnimationEffect = createEffect<{ state: Animated.Value, value: number }, Promise<null>>(async ({state, value}) => {
    return new Promise((resolve) => {
        useSpring(state, value, 10, 7).start(()=>resolve())
    })
})


export const $animValueStartWorkingMenu = createStore(new Animated.Value(0))


export const $isMountedStartWorkingMenu = createStore(false)
    .on(setIsMountedStartWorkingMenu, (_, payload) => payload)


const startAnimation = attach({
    source: $animValueStartWorkingMenu,
    mapParams: (value:number, state:Animated.Value) => ({value, state}),
    effect: startAnimationEffect,
})

showStartWorkingMenu.watch(() => {
    setIsMountedStartWorkingMenu(true)
    startAnimation(1)
})

hideStartWorkingMenu.watch(async () => {
    await startAnimation(0)
    setIsMountedStartWorkingMenu(false)
})
