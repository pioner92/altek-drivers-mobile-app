import {createEvent, createStore} from 'effector'

export const setInputValueBol = createEvent<string>()

export const $inputValueBol = createStore<string>('')
    .on(setInputValueBol, ((state, payload) => payload))
