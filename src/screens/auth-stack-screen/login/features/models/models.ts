import {createEvent, createStore} from 'effector'

export const setInputValuePhoneNumber = createEvent<string>()

export const $inputValuePhoneNumber = createStore('')
    .on(setInputValuePhoneNumber, (state, payload) => payload)


setInputValuePhoneNumber.watch(((payload) => {
    if (
        !payload.startsWith('+1') &&
        payload.length === 10 &&
        !payload.startsWith('+7') &&
        !payload.startsWith('+34')
    ) {
        setInputValuePhoneNumber('+1'+payload)
    }
}))
