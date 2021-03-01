import {showNewLoadOfferMenu} from '../../src/features/new-load-offer/models'
import {completedStatus, toUnloadStatus, toUploadStatus, unloadingStatus, uploadingStatus} from '../../hooks'
import {setButtonIsDisabled, showArrivedMenu} from '../../src/features/arrived-menu/models'
import {showStayAtPickUpMenu} from '../../src/features/stay-at-pick-up/models/models'


type statusData = {
    status: number
    substatus?: number
}


const loadStatus = (status: number, substatus?: number) => {
    const data = {status} as statusData
    substatus && (data.substatus = substatus)
    return {status, substatus}
}


export const statusGenerate = {
    newLoadOffer: loadStatus(1, 1),
    toUpload: loadStatus(2, 1),
    uploading: loadStatus(3, 1),
    uploaded: loadStatus(3, 2),
    toUnload: loadStatus(4, 1),
    unloading: loadStatus(5, 1),
    unloaded: loadStatus(5, 2),
    completed: loadStatus(6),
}


const statusValidate = (currentStatus: number, currentSubstatus: number) => {
    return ({status, substatus}: statusData) => {
        return status === currentStatus && currentSubstatus === substatus
    }
}

export const checkStatusesWithInit = (status: number, substatus: number) => {
    const validate = statusValidate(status, substatus)

    if (validate(statusGenerate.newLoadOffer)) {
        showNewLoadOfferMenu()
    } else if (validate(statusGenerate.toUpload)) {
        toUploadStatus()
        showArrivedMenu()
    } else if (validate(statusGenerate.uploading)) {
        uploadingStatus()
        showArrivedMenu()
    } else if (validate(statusGenerate.uploaded)) {
        uploadingStatus()
        setButtonIsDisabled(true)
        showStayAtPickUpMenu()
    } else if (validate(statusGenerate.toUnload)) {
        toUnloadStatus()
        showArrivedMenu()
    } else if (validate(statusGenerate.unloading)) {
        unloadingStatus()
        showArrivedMenu()
    } else if (validate(statusGenerate.unloaded)) {
        completedStatus()
        setButtonIsDisabled(true)
        showStayAtPickUpMenu()
    }
}
