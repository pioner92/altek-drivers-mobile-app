import {createEvent, createStore, Event} from 'effector'
import {loadType} from '../src/api/rest/loads/get-loads'
import {getChats} from '../src/api/rest/chat/get-chats'

// Events

export const addLoadsToStoreEvent = createEvent<Array<loadType>>()
export const setGeoLocationEvent = createEvent<{ latitude: number, longitude: number }>()
export const setSelectedBidEvent = createEvent<number | null>()
export const setSentBidIdEvent = createEvent<{ loadId: number, bid_id: number } | null>()
export const setIsStartedIntervalEvent = createEvent<boolean>()
export const setIntervalValueEvent = createEvent<number>()
export const setIsAuth = createEvent<boolean>()
export const setIsLoadedBidsEvent = createEvent<boolean>()

export const resetIsAuth = createEvent()

// State


export const loadsListStore = createStore<Array<loadType>>([])
    .on(addLoadsToStoreEvent, ((state, payload) => payload))


export const geoLocationStore = createStore<{ latitude: number, longitude: number }>({latitude: 0, longitude: 0})
    .on(setGeoLocationEvent, ((state, payload) => payload))

export const selectedBidStore = createStore<number | null>(null)
    .on(setSelectedBidEvent, ((state, payload) => payload))

export const sentBidIdStore = createStore<{ loadId: number, bid_id: number } | null>(null)
    .on(setSentBidIdEvent, ((state, payload) => payload))

export const isStartedIntervalStore = createStore(false)
    .on(setIsStartedIntervalEvent, ((state, payload) => payload))


export const intervalValueStore = createStore(180)
    .on(setIntervalValueEvent, ((state, payload) => payload))

export const $isAuth = createStore(false)
    .on(setIsAuth, ((state, payload) => payload))
    .reset(resetIsAuth)

export const isLoadedBidsStore = createStore(false)
    .on(setIsLoadedBidsEvent, ((state, payload) => payload))


export const timer = (callback?: Event<boolean>) => {
    if (callback) {
        callback(true)
    }
    const tick = setInterval(() => {
        if (intervalValueStore.getState() > 0) {
            setIntervalValueEvent(intervalValueStore.getState() - 1)
        } else {
            clearInterval(tick)
            if (callback) {
                callback(false)
            }
            setIntervalValueEvent(180)
        }
    }, 1000)
}


setIsAuth.watch((payload) => {
    if (payload) {
        getChats()
    }
})


