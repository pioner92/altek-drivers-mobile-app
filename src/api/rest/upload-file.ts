import {getDb} from '../../lib/db'
import {TOKEN} from '../../lib/db/constants'
import {urls} from '../urls'

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

const createFormData = (name: string, format: string, file: string) => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('extension', format)
    // @ts-ignore
    formData.append('path', file, `${name}.${format}`)
    return formData
}

export const uploadFile = async (name: string, type: string, file: any): Promise<resultType | undefined> => {
    try {
        const token = await getDb(TOKEN)
        const body = createFormData(name, type, file)

        const response = await fetch(urls.fileUpload(), {
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
