import {createEvent, createStore} from 'effector'

export const setIsNumberValidateFailed = createEvent<boolean>()

export const $isNumberValidateFailed = createStore(false)
    .on(setIsNumberValidateFailed, (state, payload) => payload)
