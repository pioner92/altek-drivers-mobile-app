import {createEvent, createStore, sample} from 'effector'
import moment from 'moment'

export const TIMER_VALUE = 300

export class Timer {
    static timer: NodeJS.Timer

    static start(callback: any) {
        this.timer = setInterval(() => {
            callback()
        }, 1000)
    }

    static stop() {
        clearInterval(this.timer)
    }
}

export const setIsStartedCounter = createEvent<boolean>()
export const startTimer = createEvent()
export const stopTimer = createEvent()
export const setCounter = createEvent<number>()
export const setCounterMinutes = createEvent<string>()
export const resetCounter = createEvent()


export const $counter = createStore(TIMER_VALUE)
    .on(setCounter, (state, payload) => payload)

export const $counterMinutes = createStore('')
    .on(setCounterMinutes, (state, payload) => payload)

export const $isStartedCounter = createStore(false)
    .on(setIsStartedCounter, (state, payload) => payload)


const handler = sample({
    source: $counter,
    clock: startTimer,
    fn: (state, value) => ({state, value}),
})

handler.watch(({state, value})=>{
    setIsStartedCounter(true)
    Timer.start(() => setCounter(state - 1))
})

// startTimer.watch(() => {
//     setIsStartedCounter(true)
//     Timer.start(() => setCounter($counter.getState() - 1))
// })

stopTimer.watch(() => {
    Timer.stop()
    setIsStartedCounter(false)
    resetCounter()
})

$counter.watch((state) => {
    if (state <= 0) {
        stopTimer()
    }
    setCounterMinutes(moment.unix(state).format('mm:ss'))
})

$counter.reset(resetCounter)


