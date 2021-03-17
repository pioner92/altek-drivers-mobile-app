import {createEvent, createStore, sample} from 'effector'
import moment from 'moment'

export const TIMER_VALUE = 300

export class Timer {
    static timer: NodeJS.Timer

    static start(callback: any) {
        clearInterval(this.timer)
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
export const counterTarget = createEvent<{ state: number }>()
export const initCounter = createEvent<number>()


export const $counter = createStore(TIMER_VALUE)
    .on(setCounter, (state, payload) => state - 1)
    .on(initCounter, (state, payload) => payload)
    .reset(resetCounter)

export const $counterMinutes = createStore('')
    .on(setCounterMinutes, (state, payload) => payload)

export const $isStartedCounter = createStore(false)
    .on(setIsStartedCounter, (state, payload) => payload)


sample({
    source: $counter,
    clock: startTimer,
    fn: (state, value) => ({state, value}),
    target: counterTarget,
})

counterTarget.watch(({state}) => {
    setIsStartedCounter(true)
    Timer.start(() => setCounter(state - 1))
})

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


