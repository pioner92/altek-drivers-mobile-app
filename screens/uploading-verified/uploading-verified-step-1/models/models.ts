import {createEvent, createStore} from 'effector'
import {clearUploadingData} from '../../models/models'

export const setPiecesInputValue = createEvent<string>()
export const setWeightInputValue = createEvent<string>()

export const $inputValuePieces = createStore('')
    .on(setPiecesInputValue, (_, payload) => payload)
    .on(clearUploadingData, (state, payload) => '')

export const $inputValueWeight = createStore('')
    .on(setWeightInputValue, (_, payload) => payload)
    .on(clearUploadingData, (state, payload) => '')
