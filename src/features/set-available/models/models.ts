import {createEvent, createStore, sample} from 'effector'
import {Animated} from 'react-native'
import {useSpring} from '../../../../utils/animation-hooks/Hooks'
import {setDb} from '../../../../utils/db/set-db'
import {sendIsAvailableToServer} from '../../../api/rest/send-is-available-to-server'
import {ISAVAILABLE} from '../../../../utils/db/constants'
import {sendGeoToServer} from '../../../api/rest/send-geo-to-server'


const startAnimation = createEvent<number>()

export const showSetAvailable = startAnimation.prepend(() => 0)
export const hideSetAvailable = startAnimation.prepend(() => 1)

export const setIsAvailable = createEvent<boolean>()
export const resetIsAvailable = createEvent()
export const resetSetIsAvailableAnimValue = createEvent()

export const $isAvailable = createStore(false)
    .on(setIsAvailable, ((state, payload) => payload))
    .reset(resetIsAvailable)

export const $setAvailableAnimValue = createStore(new Animated.Value(0))
    .reset(resetSetIsAvailableAnimValue)


const handler = sample({
    source: $setAvailableAnimValue,
    clock: startAnimation,
    fn: (state, to) => ({state, to}),
})

handler.watch(({state, to})=>{
    useSpring(state, to, 10, 5).start()
})

setIsAvailable.watch((state) => {
    setDb(ISAVAILABLE, state ? 'true' : 'false')
    sendIsAvailableToServer(state)
    sendGeoToServer()
})

export const $shadowColor = $isAvailable.map((state) => state ? '#A6E3B0' : '#FFC5C5')
export const $svgColor = $isAvailable.map((state) => state ? '#539E5F' : '#FF4141')
export const $title = $isAvailable.map((state) => state ? 'Available' : 'Not Available')
