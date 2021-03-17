import {createEffect} from 'effector'
import {makeRequest} from '../../make-request'
import {urls} from '../../urls'
import {
    addLoadHistory,
    addNexPageLoadHistory,
} from '../../../screens/main-stack-screen/profile/screens/completed-loads/models/models'
import {loadsResult, loadType} from './types'


export type getLoadsHistoryResultType = {
    id:number
    action:string
    created_date:string
    driver_price:number
    load:loadType
}

export type resultsType = {results:Array<getLoadsHistoryResultType>}

export type getLoadsHistoryResponseType = Omit<loadsResult, 'results'> & resultsType


export const getLoadsHistory = createEffect(async (page = 1 ):Promise<getLoadsHistoryResponseType> => {
    const url = urls.loadHistory() + `?page=${page ?? 1}`
    return await makeRequest({url, method: 'GET'})
})


getLoadsHistory.done.watch(({result, params})=>{
    // console.log('GET LOADS')
    // if (params === 1) {
    //     addLoadHistory(result.results)
    // } else {
    //     addNexPageLoadHistory(result.results)
    // }
})
getLoadsHistory.fail.watch(({error})=>{
    console.log('Get loads history error ', error)
})
