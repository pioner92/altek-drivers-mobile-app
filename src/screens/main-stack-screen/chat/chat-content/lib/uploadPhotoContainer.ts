import {uploadFileChat} from '../../../../../api/rest/upload-chat-files'

export async function uploadPhotoContainer(uri:string) {
    return await uploadFileChat('photo.jpg', 'jpeg', {uri: uri, name: 'photo.jpg', type: `image/jpeg`})
}
