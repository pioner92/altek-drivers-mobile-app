import {createEvent, createStore} from 'effector'

export const setSelectedValuePickUpDate = createEvent<string>()

export const $selectedValuePickUpDate = createStore<string>('')
    .on(setSelectedValuePickUpDate, (state, payload) => payload)
