import {createEvent, createStore} from 'effector'

export const setInputValuePickUpPoint = createEvent<string>()

export const $inputValuePickUpPoint = createStore('')
    .on(setInputValuePickUpPoint, (state, payload) => payload)
