import {successUploadHandler} from './success-upload-handler'
import {successUnloadHandler} from './success-unload-handler'
import {toUploadStatus, unloadingStatus, uploadingStatus} from '../../../../hooks'


export const statusesHandler = (status: number) => {
    switch (status) {
    case 2:
        toUploadStatus()
        break
    case 3:
        uploadingStatus()
        break
    case 4:
        successUploadHandler()
        break
    case 5:
        unloadingStatus()
        break
    case 6:
        successUnloadHandler()
        break
    default:
        return
    }
}
