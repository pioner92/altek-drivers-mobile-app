import {createEvent, createStore} from "effector";
import {Animated} from "react-native";
import {useSpring} from "../../../../utils/animation-hooks/Hooks";


export const showPreloader = createEvent()
export const hidePreloader = createEvent()
export const setIsMountedPreloader = createEvent<boolean>()

export const $animValuePreloader = createStore(new Animated.Value(0))
export const $isMountedPreloader = createStore(false)
    .on(setIsMountedPreloader,(state, payload) => payload)

showPreloader.watch(()=>{
    setIsMountedPreloader(true)
    animationService(1)
})

hidePreloader.watch(()=>{
    animationService(0,    ()=>setIsMountedPreloader(false))
})


function animationService(to:number,callback?:()=>void){
    useSpring($animValuePreloader.getState(),to,10,7).start(()=>{
        callback && callback()
    })
}
