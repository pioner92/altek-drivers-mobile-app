import {createEvent, createStore} from "effector";

export const setInputValueDeliveryPoint = createEvent<string>()

export const $inputValueDeliveryPoint = createStore('')
    .on(setInputValueDeliveryPoint,(state, payload) => payload)
