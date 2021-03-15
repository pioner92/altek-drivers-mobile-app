import {createEvent, createStore, Event, sample} from 'effector'
import {getChats} from '../src/api/rest/chat/get-chats'
import {loadType} from "../src/api/rest/loads/types";

// Events

export const addLoadsToStoreEvent = createEvent<Array<loadType>>()
export const setGeoLocationEvent = createEvent<{ latitude: number, longitude: number }>()
export const setSelectedBidEvent = createEvent<number | null>()
export const setSentBidIdEvent = createEvent<{ loadId: number, bid_id: number } | null>()
export const setIsStartedIntervalEvent = createEvent<boolean>()
export const setIntervalValueEvent = createEvent<number>()
export const setIsAuth = createEvent<boolean>()
export const setIsLoadedBidsEvent = createEvent<boolean>()
export const addNewLoad = createEvent<loadType>()

export const resetIsAuth = createEvent()

export const timerClock = createEvent<(status:boolean)=>void>()
export const timerHandler = createEvent<{interval:number, callback:(status:boolean)=>void}>()

// State


export const loadsListStore = createStore<Array<loadType>>([])
    .on(addLoadsToStoreEvent, (state, payload) => payload)
    .on(addNewLoad, (state, payload) => [payload, ...state])


export const $geoLocationStore = createStore<{ latitude: number, longitude: number }>({latitude: 0, longitude: 0})
    .on(setGeoLocationEvent, (state, payload) => payload)

export const selectedBidStore = createStore<number | null>(null)
    .on(setSelectedBidEvent, (state, payload) => payload)

export const sentBidIdStore = createStore<{ loadId: number, bid_id: number } | null>(null)
    .on(setSentBidIdEvent, (state, payload) => payload)

export const isStartedIntervalStore = createStore(false)
    .on(setIsStartedIntervalEvent, (state, payload) => payload)


export const intervalValueStore = createStore(180)
    .on(setIntervalValueEvent, (state, payload) => payload)

export const $isAuth = createStore(false)
    .on(setIsAuth, (state, payload) => payload)
    .reset(resetIsAuth)

export const isLoadedBidsStore = createStore(false)
    .on(setIsLoadedBidsEvent, (state, payload) => payload)


sample({
    source: intervalValueStore,
    clock: timerClock,
    fn: (interval, callback)=>({interval: 2, callback}),
    target: timerHandler,
})


// export const timer = (callback?: Event<boolean>) => {
timerHandler.watch(({callback, interval})=>{
    if (callback) {
        callback(true)
    }
    const tick = setInterval(() => {
        if (interval > 0) {
            setIntervalValueEvent(interval - 1)
        } else {
            clearInterval(tick)
            if (callback) {
                callback(false)
            }
            setIntervalValueEvent(180)
        }
    }, 1000)
})

setIsAuth.watch((payload) => {
    if (payload) {
        getChats()
    }
})


