import {createEvent, createStore} from 'effector'
import {clearUploadingData} from '../../models/models'

export const setImageDataTruck = createEvent<string>()

export const $imageDataTruck = createStore('')
    .on(setImageDataTruck, ((state, payload) => payload))
    .on(clearUploadingData, (state, payload) => '')
