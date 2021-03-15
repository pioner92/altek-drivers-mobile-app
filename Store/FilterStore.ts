import {createEvent, createStore} from 'effector'

export const setMaxMilesEvent = createEvent<number>()
export const setPickUpPointEvent = createEvent<string>()
export const setDeliveryPointEvent = createEvent<string>()
export const setMinimumDimsLengthEvent = createEvent<string>()
export const setMinimumDimsWidthEvent = createEvent<string>()
export const setMinimumDimsHeightEvent = createEvent<string>()
export const setMinimumPayloadsEvent = createEvent<string>()


export const $maxMiles = createStore(200)
    .on(setMaxMilesEvent, (state, payload) => payload)

export const $pickUpPoint = createStore('')
    .on(setPickUpPointEvent, (state, payload) => payload)

export const $deliveryPoint = createStore('')
    .on(setDeliveryPointEvent, (state, payload) => payload)

export const $minimumDimsLength = createStore('')
    .on(setMinimumDimsLengthEvent, (state, payload) => payload)

export const $minimumDimsWidth = createStore('')
    .on(setMinimumDimsWidthEvent, (state, payload) => payload)

export const $minimumDimsHeight = createStore('')
    .on(setMinimumDimsHeightEvent, (state, payload) => payload)

export const $minimumPayloads = createStore('')
    .on(setMinimumPayloadsEvent, (state, payload) => payload)
