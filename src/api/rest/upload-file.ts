import {getDb} from '../../lib/db'
import {TOKEN} from '../../lib/db/constants'

type resultType = {
    chat: null
    created_date: string
    extension: string
    file_name: string
    id: number
    message: null
    name: string
    path: string
    size: string
}

export const uploadFile = async (url:string, body:any): Promise<resultType | undefined> => {
    try {
        const token = await getDb(TOKEN)

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': `JWT ${token}`,
            },
            body,
        })
        return await response.json()
    } catch (e) {
        console.log('Upload file error', e)
    }
}
