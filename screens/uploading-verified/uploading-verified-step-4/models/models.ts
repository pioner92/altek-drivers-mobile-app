import { createEvent, createStore} from "effector";
import {clearUploadingData} from "../../models/models";

export const setInputValueAddress = createEvent<string>()

export const $inputValueAddress = createStore<string>('')
    .on(setInputValueAddress, ((state, payload) => payload))
    .on(clearUploadingData,(state, payload) => '')


