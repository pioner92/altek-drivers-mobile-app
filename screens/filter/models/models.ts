import {createEvent, createStore} from "effector";


export const setIsFilteredBids = createEvent<boolean>()

export const $isFilteredBids = createStore(false)
    .on(setIsFilteredBids,(state, payload) => payload)
