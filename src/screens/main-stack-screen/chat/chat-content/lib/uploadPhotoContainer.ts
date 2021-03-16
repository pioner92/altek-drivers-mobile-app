import {uploadFile} from '../../../../../api/rest/upload-file'

export async function uploadPhotoContainer(uri:string) {
    return await uploadFile('photo.jpg', 'jpeg', {uri: uri, name: 'photo.jpg', type: `image/jpeg`})
}
