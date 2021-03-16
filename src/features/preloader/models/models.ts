import {attach, createEffect, createEvent, createStore} from 'effector'
import {Animated} from 'react-native'
import {useSpring} from '../../../lib/animation-hooks/Hooks'


export const showPreloader = createEvent()
export const hidePreloader = createEvent()
export const setIsMountedPreloader = createEvent<boolean>()


const startAnimationEffect = createEffect<{state:Animated.Value, to:number}, Promise<any>>(async ({state, to}) => {
    return new Promise((resolve)=>{
        useSpring(state, to, 10, 7).start(resolve)
    })
})

export const $animValuePreloader = createStore(new Animated.Value(0))
export const $isMountedPreloader = createStore(false)
    .on(setIsMountedPreloader, (state, payload) => payload)

showPreloader.watch(() => {
    setIsMountedPreloader(true)
    startAnimation(1)
})

hidePreloader.watch(async () => {
    await startAnimation(0)
    setIsMountedPreloader(false)
})


const startAnimation = attach({
    source: $animValuePreloader,
    mapParams: (to:number, state) => ({to, state}),
    effect: startAnimationEffect,
})


