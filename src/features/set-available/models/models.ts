import {createEvent, createStore} from 'effector'
import {Animated} from "react-native";
import {useSpring} from "../../../../utils/animation-hooks/Hooks";
import {$isMountedArrivedMenu} from "../../arrived-menu/models/models";
import {setDb} from "../../../../utils/db/set-db";
import {sendIsAvailableToServer} from "../../../api/rest/send-is-available-to-server";
import {ISAVAILABLE} from "../../../../utils/db/constants";
import {sendGeoToServer} from "../../../api/rest/send-geo-to-server";

export const showSetAvailable = createEvent()
export const hideSetAvailable = createEvent()
export const setIsAvailable = createEvent<boolean>()
export const resetIsAvailable = createEvent()
export const resetSetIsAvailableAnimValue = createEvent()

export const $isAvailable = createStore(false)
    .on(setIsAvailable, ((state, payload) => payload))
    .reset(resetIsAvailable)

export const $setAvailableAnimValue = createStore(new Animated.Value(0))
    .reset(resetSetIsAvailableAnimValue)

showSetAvailable.watch(() => {
        useSpring($setAvailableAnimValue.getState(), 0, 10, 5).start()
})
hideSetAvailable.watch(() => {
    useSpring($setAvailableAnimValue.getState(), 1, 10, 5).start()
})

setIsAvailable.watch((state => {
    setDb(ISAVAILABLE, state ? 'true' : 'false')
    sendIsAvailableToServer(state)
    sendGeoToServer()
}))

export const $shadowColor = $isAvailable.map((state) => state ? '#A6E3B0' : '#FFC5C5')
export const $svgColor = $isAvailable.map(state => state ? '#539E5F' : '#FF4141')
export const $title = $isAvailable.map(state => state ? 'Available' : 'Not Available')
