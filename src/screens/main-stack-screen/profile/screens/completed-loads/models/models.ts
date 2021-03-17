import {createEvent, createStore} from 'effector'
import {getLoadsHistory, getLoadsHistoryResultType} from '../../../../../../api/rest/loads/get-loads-history'

export const addLoadHistory = createEvent<Array<getLoadsHistoryResultType>>()
export const addNexPageLoadHistory = createEvent<Array<getLoadsHistoryResultType>>()
export const nexPageLoadHistory = createEvent()
export const resetLoadHistory = createEvent()

export const $loadHistory = createStore<Array<getLoadsHistoryResultType>>([])
    .on(addLoadHistory, (state, payload) => payload)
    .on(addNexPageLoadHistory, (state, payload) => [...state, ...payload])
    .reset(resetLoadHistory)

export const $loadHistoryPageNumber = createStore(1)
    .on(nexPageLoadHistory, (state, payload) => state + 1)


$loadHistoryPageNumber.watch(async (pageNumber) => {
    const loads = await getLoadsHistory(pageNumber)
    if (pageNumber === 1) {
        addLoadHistory(loads.results)
    } else {
        addNexPageLoadHistory(loads.results)
    }
})
