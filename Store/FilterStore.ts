import {createEvent, createStore} from 'effector'

export const setMaxMilesEvent = createEvent<number>()
export const setPickUpPointEvent = createEvent<string>()
export const setDeliveryPointEvent = createEvent<string>()
export const setMinimumDimsLengthEvent = createEvent<string>()
export const setMinimumDimsWidthEvent = createEvent<string>()
export const setMinimumDimsHeightEvent = createEvent<string>()
export const setMinimumPayloadsEvent = createEvent<string>()


export const maxMilesStore = createStore(150)
    .on(setMaxMilesEvent, ((state, payload) => payload))

export const pickUpPointStore = createStore('')
    .on(setPickUpPointEvent, ((state, payload) => payload))

export const deliveryPointStore = createStore('')
    .on(setDeliveryPointEvent, ((state, payload) => payload))

export const minimumDimsLengthStore = createStore('')
    .on(setMinimumDimsLengthEvent, ((state, payload) => payload))

export const minimumDimsWidthStore = createStore('')
    .on(setMinimumDimsWidthEvent, ((state, payload) => payload))

export const minimumDimsHeightStore = createStore('')
    .on(setMinimumDimsHeightEvent, ((state, payload) => payload))

export const minimumPayloadsStore = createStore('')
    .on(setMinimumPayloadsEvent, ((state, payload) => payload))
