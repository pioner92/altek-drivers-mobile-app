import {createStore,createEvent} from 'effector'
import {clearUploadingData} from "../../models/models";

export const setInputValueBol = createEvent<string>()
export const setSelectedIndex = createEvent<number>()
export const setImageDataBol = createEvent<string>()

export const $inputValueBol = createStore('')
    .on(setInputValueBol,((state, payload) => payload))
    .on(clearUploadingData,(state, payload) => '')

export const $selectedIndex = createStore(0)
    .on(setSelectedIndex,((state, payload) => payload))
    .on(clearUploadingData,(state, payload) => 0)

export const $imageDataBol = createStore('')
    .on(setImageDataBol,((state, payload) => payload))
    .on(clearUploadingData,(state, payload) => '')
