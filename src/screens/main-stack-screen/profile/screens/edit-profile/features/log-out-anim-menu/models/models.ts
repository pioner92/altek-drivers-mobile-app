import {attach, createEffect, createEvent, createStore, sample} from 'effector'
import {Animated} from 'react-native'
import {useSpring} from '../../../../../../../../../utils/animation-hooks/Hooks'

export const showLogOutAnimMenu = createEvent()
export const hideLogOutAnimMenu = createEvent()
export const setIsMountedLogOutAnimMenu = createEvent<boolean>()

const startAnimationEffect = createEffect<{state:Animated.Value, to:number}, Promise<null>>(async ({state, to}) => {
    return new Promise((resolve) =>{
        useSpring(state, to, 15, 15).start(() => resolve())
    })
})

export const $animValueLogOutAnimMenu = createStore(new Animated.Value(0))
export const $isMountedLogOutAnimMenu = createStore(false)
    .on(setIsMountedLogOutAnimMenu, (state, payload) => payload)


const startAnimation = attach({
    source: $animValueLogOutAnimMenu,
    mapParams: (to:number, state) => ({to, state}),
    effect: startAnimationEffect,
})


showLogOutAnimMenu.watch(() => {
    setIsMountedLogOutAnimMenu(true)
    startAnimation(1)
})
hideLogOutAnimMenu.watch(async () => {
    await startAnimation(0)
    setIsMountedLogOutAnimMenu(false)
})

