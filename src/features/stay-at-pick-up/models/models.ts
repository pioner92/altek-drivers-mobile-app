import {createStore, createEvent, createEffect} from "effector";
import {Animated} from "react-native";
import {useSpring} from "../../../../utils/animation-hooks/Hooks";
import {hideArrivedMenu, showArrivedMenu} from "../../arrived-menu/models";

type callback = ()=>void


export const setIsMountedStayAtPickUpMenu = createEvent<boolean>()

export const $isMounted = createStore(false)
.on(setIsMountedStayAtPickUpMenu,((state, payload) => payload))

export const showStayAtPickUpMenu = createEffect(async ()=>{
    return new Promise((resolve)=>{
        setIsMountedStayAtPickUpMenu(true)
        showArrivedMenu()
        useSpring($stayAtPickUpAnimValue.getState(),1,10,5).start(resolve)
    })
})

export const hideStayAtPickUpMenu = createEffect(async ()=>{
    return new Promise((resolve)=>{
        useSpring($stayAtPickUpAnimValue.getState(),0,10,5).start(resolve)
    })
})

export const $stayAtPickUpAnimValue = createStore(new Animated.Value(0))

showStayAtPickUpMenu.done.watch(()=>{
    showArrivedMenu()
})
hideStayAtPickUpMenu.done.watch(()=>{
    setIsMountedStayAtPickUpMenu(false)
})


