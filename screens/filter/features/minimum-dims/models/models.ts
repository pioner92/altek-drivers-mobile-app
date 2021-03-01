import {createEvent, createStore} from 'effector'


export const selectScrollValues = () => {
    const values = []
    for (let i = 0; i < 1000; i++) {
        if (i % 50 == 0) {
            values.push({id: i, value: i})
        }
    }
    return values
}


export const setMinimumDimsLengthValue = createEvent<number | null>()
export const setMinimumDimsWidthValue = createEvent<number | null>()
export const setMinimumDimsHeightValue = createEvent<number | null>()

export const $minimumDimsLengthValue = createStore<number | null>(selectScrollValues()[0].value)
    .on(setMinimumDimsLengthValue, (state, payload) => payload)

export const $minimumDimsWidthValue = createStore<number | null>(selectScrollValues()[0].value)
    .on(setMinimumDimsWidthValue, (state, payload) => payload)

export const $minimumDimsHeightValue = createStore<number | null>(selectScrollValues()[0].value)
    .on(setMinimumDimsHeightValue, (state, payload) => payload)


