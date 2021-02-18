import {createStore,createEvent} from "effector";

export const setInputValuePieces = createEvent<string>()
export const setInputValueWeight = createEvent<string>()

export const $inputValuePieces = createStore<string>('')
    .on(setInputValuePieces,((state, payload) => payload))

export const $inputValueWeight = createStore<string>('')
    .on(setInputValueWeight,((state, payload) => payload))
