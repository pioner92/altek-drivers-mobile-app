import {createEvent, createStore} from 'effector'

export const setInputValueUnloadedBy = createEvent<string>()
export const setImageDataPod = createEvent<string>()
export const clearUnloadingData = createEvent()

export const $inputValueUnloadedBy = createStore('')
    .on(setInputValueUnloadedBy, ((state, payload) => payload))
    .on(clearUnloadingData, (state, payload) => '')

export const $imageDataPod = createStore('')
    .on(setImageDataPod, ((state, payload) => payload))
    .on(clearUnloadingData, (state, payload) => '')
