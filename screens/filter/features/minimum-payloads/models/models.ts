import {createEvent, createStore} from "effector";

export const MIN_VALUE = 0
export const MAX_VALUE = 10000

export const setSliderValueMinimumPayloadsLeft = createEvent<number>()
export const setSliderValueMinimumPayloadsRight = createEvent<number>()

export const $sliderValueMinimumPayloadsLeft = createStore(MIN_VALUE)
    .on(setSliderValueMinimumPayloadsLeft,(state, payload) => payload)

export const $sliderValueMinimumPayloadsRight = createStore(MAX_VALUE)
    .on(setSliderValueMinimumPayloadsRight,(state, payload) => payload)
