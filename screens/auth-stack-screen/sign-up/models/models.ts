import {createEvent, createStore} from 'effector'

export const setInputValueSignUpName = createEvent<string>()
export const setInputValueSignUpNumber = createEvent<string>()

export const $inputValueSignUpName = createStore<string>('')
    .on(setInputValueSignUpName, (state, payload) => payload)

export const $inputValueSignUpNumber = createStore<string>('')
    .on(setInputValueSignUpNumber, (state, payload) => payload)


