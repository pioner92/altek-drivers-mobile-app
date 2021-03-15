import {attach, createEffect, createEvent, createStore} from 'effector'
import {Animated} from 'react-native'
import {useSpring} from '../../../../../utils/animation-hooks/Hooks'

const setIsMountedAttachMenu = createEvent<boolean>()

const startAnimation = createEffect<{value:number, state:Animated.Value}, Promise<any>>(async ({value, state}) => {
    return new Promise((resolve) => {
        useSpring(state, value, 10, 9).start(()=>{
            resolve()
        })
    })
})

export const showAttachMenu = createEvent()
export const hideAttachMenu = createEvent()

export const $animValueAttachMenu = createStore(new Animated.Value(0))
export const $isMountedAttachMenu = createStore(false)
    .on(setIsMountedAttachMenu, (state, payload) => payload)

const animatedHandler = attach({
    source: $animValueAttachMenu,
    mapParams: (value:number, state:Animated.Value)=>({value, state}),
    effect: startAnimation,
})

showAttachMenu.watch(()=>{
    setIsMountedAttachMenu(true)
    animatedHandler(1)
})
hideAttachMenu.watch(async ()=>{
    await animatedHandler(0)
    setIsMountedAttachMenu(false)
})


