import { createEvent, createStore} from "effector";

export const MAX_MILES = 200
export const MIN_MILES = 0

export const setSliderValueMaxMilesLeft = createEvent<number>()
export const setSliderValueMaxMilesRight = createEvent<number>()

export const $sliderValueMaxMilesLeft = createStore(MIN_MILES)
    .on(setSliderValueMaxMilesLeft,(state, payload) => payload)

export const $sliderValueMaxMilesRight = createStore(MAX_MILES)
    .on(setSliderValueMaxMilesRight,(state, payload) => payload)
