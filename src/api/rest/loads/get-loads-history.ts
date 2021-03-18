import {createEffect} from 'effector'
import {makeRequest} from '../../make-request'
import {urls} from '../../urls'
import {loadsResult, loadType} from './types'


export type getLoadsHistoryResultType = {
    id:number
    action:string
    created_date:string
    driver_price:number
    load:loadType
}
type sum = {
    sum:number
}

export type resultsType = {results:Array<getLoadsHistoryResultType>}

export type getLoadsHistoryResponseType = Omit<loadsResult, 'results'> & resultsType & sum


export const getLoadsHistory = createEffect(async (page = 1 ):Promise<getLoadsHistoryResponseType> => {
    const url = urls.loadHistory() + `?page=${page ?? 1}`
    return await makeRequest({url, method: 'GET'})
})


getLoadsHistory.fail.watch(({error})=>{
    console.log('Get loads history error ', error)
})
