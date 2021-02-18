import {createStore,createEvent} from "effector";
import {Animated} from "react-native";
import {useSpring, useTiming} from "../../../../utils/animation-hooks/Hooks";

export const showNavigationPanel = createEvent()
export const hideNavigationPanel = createEvent()

export const setSelectedIndexNavButton = createEvent<number>()

export const $animValueNavigation = createStore(new Animated.Value(0))

export enum navButtonIndex  {
    null,
    home,
    bids,
    chat,
    profile
}

export const $selectedIndexNavButton = createStore(navButtonIndex.null)
    .on(setSelectedIndexNavButton,(state, payload) => payload)


showNavigationPanel.watch(()=>{
    useSpring($animValueNavigation.getState(),1,10,5).start()
})

hideNavigationPanel.watch(()=>{
    useTiming($animValueNavigation.getState(),0,800).start()
})
