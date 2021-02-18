import {createEvent, createStore} from "effector";
import {Animated} from "react-native";
import {useSpring} from "../../../../utils/animation-hooks/Hooks";

type itemType = {
    id:number,
    value:string
}


export const setScrollSelectedMenuSelectedValue = createEvent<itemType>()
export const setInputValueScrollSelectMenu = createEvent<string>()
export const showScrollSelectMenu = createEvent()
export const hideScrollSelectMenu = createEvent()
export const setIsMountedScrollSelectMenu = createEvent<boolean>()
export const resetInputValueScrollMenu = createEvent()


export const $scrollSelectMenuSelectedValue = createStore({id:0,value:''})
    .on(setScrollSelectedMenuSelectedValue,(state, payload) => payload)

export  const  $inputValueScrollSelectMenu = createStore("1")
    .on(setInputValueScrollSelectMenu,(state, payload) => payload)
    .reset(resetInputValueScrollMenu)

export const $isMountedScrollSelectMenu = createStore(false)
    .on(setIsMountedScrollSelectMenu,(state, payload) => payload)

export const $animatedValueScrollSelectMenu = createStore(new Animated.Value(0))

showScrollSelectMenu.watch(()=>{
    setIsMountedScrollSelectMenu(true)
    useSpring($animatedValueScrollSelectMenu.getState(),1,10,7).start()
})

hideScrollSelectMenu.watch(()=>{
    useSpring($animatedValueScrollSelectMenu.getState(),0,10,7).start(()=>{
        setIsMountedScrollSelectMenu(false)
        resetInputValueScrollMenu()
    })
})