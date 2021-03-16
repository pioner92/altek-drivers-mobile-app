import {attach, createEffect, createEvent, createStore} from 'effector'
import {Animated} from 'react-native'
import {useSpring} from '../../../lib/animation-hooks/Hooks'
import {
    hideDarkBGAnimated,
    showDarkBGAnimated,
} from '../../../screens/main-stack-screen/home/available-home/features/dark-bg-animated/models/models'

type itemType = {
    id: number,
    value: string
}


const startAnimationEffect = createEffect<{ state: Animated.Value, to: number }, Promise<null>>(async ({state, to}) => {
    return new Promise((resolve) => {
        useSpring(state, to, 10, 7).start(() => resolve())
    })
})

export const setScrollSelectedMenuSelectedValue = createEvent<itemType>()
export const setInputValueScrollSelectMenu = createEvent<string>()
export const showScrollSelectMenu = createEvent()
export const hideScrollSelectMenu = createEvent()
export const setIsMountedScrollSelectMenu = createEvent<boolean>()
export const resetInputValueScrollMenu = createEvent()


export const $scrollSelectMenuSelectedValue = createStore({id: 0, value: ''})
    .on(setScrollSelectedMenuSelectedValue, (state, payload) => payload)

export const $inputValueScrollSelectMenu = createStore('1')
    .on(setInputValueScrollSelectMenu, (state, payload) => payload)
    .reset(resetInputValueScrollMenu)

export const $isMountedScrollSelectMenu = createStore(false)
    .on(setIsMountedScrollSelectMenu, (state, payload) => payload)

export const $animatedValueScrollSelectMenu = createStore(new Animated.Value(0))


const startAnimation = attach({
    source: $animatedValueScrollSelectMenu,
    effect: startAnimationEffect,
    mapParams: (to: number, state) => ({state, to}),
})

showScrollSelectMenu.watch(() => {
    showDarkBGAnimated()
    setIsMountedScrollSelectMenu(true)
    startAnimation(1)
})

hideScrollSelectMenu.watch(async () => {
    hideDarkBGAnimated()
    await startAnimation(0)
    setIsMountedScrollSelectMenu(false)
    resetInputValueScrollMenu()
})
