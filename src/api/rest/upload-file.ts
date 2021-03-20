import {getDb} from '../../lib/db'
import {TOKEN} from '../../lib/db/constants'
import axios from 'axios'

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

export const uploadFile = async (url: string, body: any, progressCallback?: (progress:number) => void): Promise<resultType | undefined> => {
    try {
        const token = await getDb(TOKEN)


        const data = await axios.put(url, body, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `JWT ${token}`,
                'Accept': 'application/json',
            },
            onUploadProgress: function(progressEvent) {
                progressCallback && progressCallback(Math.round((progressEvent.loaded / progressEvent.total) * 100))
            },
        })
        return await data.data
    } catch (e) {
        console.log('Upload file error', e)
    }
}
