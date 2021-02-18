import {createStore,createEvent} from "effector";

export const setInputValuePhoneNumber = createEvent<string>()

export const $inputValuePhoneNumber = createStore('')
    .on(setInputValuePhoneNumber,(state, payload) => payload)


setInputValuePhoneNumber.watch((payload => {
    // if(!payload.startsWith('+1') && payload.length>3){
    //     setInputValuePhoneNumber('+1'+payload)
    // }
}))
