import {getDb} from '../../../utils/db'
import {TOKEN} from '../../../utils/db/constants'
import {urls} from '../urls'

type resultType = {
    'chat': null,
    'created_date': string
    'extension': string
    'file_name': string
    'id': number
    'message': null
    'name': string
    'path': string
    'size': string
}

const createFormData = (name: string, format: string, file: string) => {
    const formData = new FormData()
    formData.append('name', name)
    // @ts-ignore
    formData.append('path', file, `${name}.${format}`)
    return formData
}

export const uploadFile = async (name: string, type: string, file: any): Promise<resultType> => {
    let format = 'jpg'

    switch (type) {
    case 'file':
        format = 'pdf'
    }

    const token = await getDb(TOKEN)
    const body = createFormData(name, format, file)

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
}
