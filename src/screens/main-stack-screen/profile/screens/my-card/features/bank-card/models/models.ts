import {createEvent, createStore} from 'effector'

export const setIsVisibleBankCardData = createEvent<boolean>()

export const $isVisibleBankCardData = createStore(false)
    .on(setIsVisibleBankCardData, (state, payload) => payload)

