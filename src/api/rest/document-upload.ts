import {getDb} from '../../lib/db/get-db'
import {TOKEN} from '../../lib/db/constants'
import {urls} from '../urls'


export class UploadDocumentService {
    FileService: FileService
    UploadService: UploadService

    constructor(UploadService: UploadService) {
        this.FileService = new FileService()
        this.UploadService = UploadService
    }

    uploadBolPicture(uri: string, id: string) {
        return this.UploadService.sentTuServer(this.FileService.create('BOL.jpeg', id, uri))
    }

    uploadTruckPicture(uri: string, id: string) {
        return this.UploadService.sentTuServer(this.FileService.create('Truck.jpeg', id, uri))
    }

    uploadPodPicture(uri: string, id: string) {
        return this.UploadService.sentTuServer(this.FileService.create('Pod.jpeg', id, uri))
    }
}

class FileService {
    UploadService: UploadService = new UploadService()
    file: { uri: string, name: string, type: string } = {uri: '', name: '', type: ''}
    formData: FormData = new FormData()

    create(name: string, id: string, uri: string) {
        this.UploadService = new UploadService()
        this.file = this.UploadService.createFileData(uri, name)
        return this.UploadService.createFormData(id, name, this.file)
    }
}


export class UploadService {
    createFormData(id: string, name: string, file: { uri: string, name: string, type: string }) {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('load', id)
        // @ts-ignore
        formData.append('file', file, 'image.jpg')
        return formData
    }

    createFileData(uri: string, name: string) {
        return ({uri, name, type: 'image/jpeg'})
    }

    async sentTuServer(data: FormData) {
        try {
            const token = await getDb(TOKEN)
            const response = await fetch(urls.documentUpload(), {
                method: 'PUT',
                headers: {
                    // 'Accept': 'application/json',
                    // 'Content-Type': 'multipart/form-data',
                    'Authorization': `JWT ${token}`,
                },
                body: data,
            })
            return await response.json()
        } catch (e) {
            console.log('Send to server document ERROR: ', e)
        }
    }
}

