import {createEvent, createStore} from "effector";

export const setInputValueUserName = createEvent<string>()
export const setInputValueUserPhone = createEvent<string>()

export const $inputValueUserName = createStore('')
    .on(setInputValueUserName,(state, payload) =>payload )

export const $inputValueUserPhone = createStore('')
    .on(setInputValueUserPhone,(state, payload) => payload)
