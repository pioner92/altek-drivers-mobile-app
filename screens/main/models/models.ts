import {createEvent, createStore} from 'effector'

export const setIsWaitingResult = createEvent<boolean>()


export const $isWaitingResult = createStore(false)
    .on(setIsWaitingResult, ((state, payload) => payload))


