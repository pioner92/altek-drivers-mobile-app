import {createEvent, createStore} from 'effector'
import {Animated, Keyboard, PanResponder} from 'react-native'
import {useSpring} from '../../../../utils/animation-hooks/Hooks'

export const showSwipeMenuWrapper = createEvent()
export const hideSwipeMenuWrapper = createEvent()
export const setValueDY = createEvent<number>()
export const setNewAnimatedValue = createEvent<number>()

const onMoveHandler = (e: any, gestureState: any) => {
    if (gestureState.dy > 0) {
        $animValueSwipeMenuWrapper.getState().setValue({x: 0, y: gestureState.dy})
    }
}


export const $animValueSwipeMenuWrapper = createStore(new Animated.ValueXY({x: 0, y: 0}))

export const $newAnimValueSwipeMenuWrapper = createStore(new Animated.ValueXY({x: 0, y: 0}))
    .on(setNewAnimatedValue, (state, payload) => state.setValue({x: 0, y: payload}))

export const $swipeMenuWrapperValueDY = createStore(0)
    .on(setValueDY, (state, payload) => payload)

export const $panResponder = createStore(PanResponder.create({
    onMoveShouldSetPanResponder: () => true,

    onPanResponderGrant: (e, gestureState) => {
        $animValueSwipeMenuWrapper.getState().extractOffset()
    },
    onPanResponderMove: onMoveHandler,
    // onPanResponderMove: Animated.event([
    //         null,
    //         {dy: $animValueSwipeMenuWrapper.getState().y}
    //     ],
    //     {useNativeDriver: false,listener:(event)=>{}}
    // ),

    onPanResponderRelease: (e, gestureState) => {
        hideSwipeMenuWrapper()
        setValueDY(gestureState.dy)
    },
}))

$animValueSwipeMenuWrapper.getState().addListener((e) => {
    if (e.y > -20) {
        setNewAnimatedValue(e.y)
    }
})

showSwipeMenuWrapper.watch(() => {
    Keyboard.dismiss()
    useSpring($animValueSwipeMenuWrapper.getState(), {x: 0, y: 0}, 10, 7).start()
})

hideSwipeMenuWrapper.watch(() => {
    useSpring($animValueSwipeMenuWrapper.getState(), {x: 0, y: 0}, 10, 7).start()
})
