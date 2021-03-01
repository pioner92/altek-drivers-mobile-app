import {createEvent, createStore} from 'effector'


type sentBidData = {
    id: number
    price: number
}

export const setSentBidData = createEvent<sentBidData | null>()

export const $sentBidData = createStore<sentBidData | null>(null)
    .on(setSentBidData, (state, payload) => payload)

