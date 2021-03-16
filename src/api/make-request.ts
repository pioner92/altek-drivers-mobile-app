import {getDb} from '../lib/db/get-db'
import {TOKEN} from '../lib/db/constants'

type requestDataType = {
    url: string
    method: 'POST' | 'GET' | 'PUT'
    token?: boolean
    body?: object | string | number
}


export const makeRequest = async ({url, method, body, token}: requestDataType) => {
    try {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        }
        if (token) {
            const token = await getDb(TOKEN)
            headers['Authorization'] = `JWT ${token}`
        }
        const data: RequestInit = {
            method,
            headers,
        }
        if (body) {
            data['body'] = JSON.stringify(body)
        }
        const response = await fetch(url, data)
        return response.json()
    } catch (e) {
        console.log('Make request ERROR: ', e)
    }
}
