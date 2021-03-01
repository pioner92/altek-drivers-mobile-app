import {createEvent, createStore} from 'effector'

export const statuses = {
    waiting: 'waiting',
    toUpload: 'toUpload',
    uploading: 'uploading',
    toUnload: 'toUnload',
    unloading: 'unloading',
    completed: 'completed',
}

type keys = keyof typeof statuses
type eventType = typeof statuses[keys]

export const waitingStatus = createEvent()
export const toUploadStatus = createEvent()
export const uploadingStatus = createEvent()
export const toUnloadStatus = createEvent()
export const unloadingStatus = createEvent()
export const completedStatus = createEvent()

export const setSelfStatus = createEvent<eventType>()

export const resetSelfStatus = createEvent()

export const $selfStatus = createStore<eventType>(statuses.waiting)
    .on(setSelfStatus, ((state, payload) => payload))
    .reset(resetSelfStatus)

waitingStatus.watch(() => {
    setSelfStatus(statuses.waiting)
})
toUploadStatus.watch(() => {
    setSelfStatus(statuses.toUpload)
})
uploadingStatus.watch(() => {
    setSelfStatus(statuses.uploading)
})
toUnloadStatus.watch(() => {
    setSelfStatus(statuses.toUnload)
})
unloadingStatus.watch(() => {
    setSelfStatus(statuses.unloading)
})
completedStatus.watch(() => {
    setSelfStatus(statuses.completed)
})

