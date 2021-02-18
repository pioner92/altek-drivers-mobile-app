import {createEvent,createStore} from 'effector'

export const setCheckedIndex = createEvent<number>()

export const $checkedIndex = createStore(0)
    .on(setCheckedIndex,((state, payload) => payload))

