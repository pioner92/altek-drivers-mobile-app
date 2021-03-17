import {createEffect} from 'effector'
import {urls} from '../urls'
import {uploadFile} from './upload-file'


const createFormData = (file: {uri:string, name:string, type:string}) => {
    const formData = new FormData()
    // @ts-ignore
    formData.append('avatar', file, `avatar.jpg`)
    return formData
}

export const updateAvatar = createEffect(async (uri:string) => {
    const body = createFormData({uri, name: 'avatar.jpg', type: 'avatar.jpg'})
    return await uploadFile(urls.updateProfile(), body)
})

