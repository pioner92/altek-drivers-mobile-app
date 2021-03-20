import {uploadFile} from './upload-file'
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
    formData.append('path', file, `${name}.${format}`)
    return formData
}

export const uploadFileChat = async (name: string, type: string, file: any, progressCallback?: (progress: number) => void): Promise<resultType | undefined> => {
    try {
        const body = createFormData(name, type, file)
        return await uploadFile(urls.fileUpload(), body, progressCallback)
    } catch (e) {
        console.log('Upload file error', e)
    }
}
