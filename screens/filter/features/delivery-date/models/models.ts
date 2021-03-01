import {createEvent, createStore} from 'effector'


export const setSelectedValueDeliveryDate = createEvent<string>()

export const $selectedValueDeliveryDate = createStore('')
    .on(setSelectedValueDeliveryDate, (state, payload) => payload)
