import {hideNewLoadOfferMenu, showNewLoadOfferMenu} from '../../src/features/new-load-offer/models'
import {completedStatus, toUploadStatus, unloadingStatus, uploadingStatus} from '../../hooks'
import {hideArrivedMenu, setButtonIsDisabled, showArrivedMenu} from '../../src/features/arrived-menu/models'
import {hideStayAtPickUpMenu, showStayAtPickUpMenu} from '../../src/features/stay-at-pick-up/models/models'
import {successUnloadHandler, successUploadHandler} from '../../src/api/socket-client/lib'


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
    completed: loadStatus(6, 2),
}


const statusValidate = (currentStatus: number, currentSubstatus: number) => {
    return ({status, substatus}: statusData) => {
        return status === currentStatus && currentSubstatus === substatus
    }
}

const closeStayModal = ()=> {
    hideStayAtPickUpMenu()
    setButtonIsDisabled(false)
}

export const checkStatusesWithInit = (status: number, substatus: number) => {
    const validate = statusValidate(status, substatus)

    if (status !== 1 && status !== 6) {
        showArrivedMenu()
    }


    if (validate(statusGenerate.newLoadOffer)) {
        showNewLoadOfferMenu()
        hideArrivedMenu()
    } else if (validate(statusGenerate.toUpload)) {
        hideNewLoadOfferMenu()
        toUploadStatus()
    } else if (validate(statusGenerate.uploading)) {
        closeStayModal()
        uploadingStatus()
    } else if (validate(statusGenerate.uploaded)) {
        uploadingStatus()
        setButtonIsDisabled(true)
        showStayAtPickUpMenu()
    } else if (validate(statusGenerate.toUnload)) {
        successUploadHandler()
    } else if (validate(statusGenerate.unloading)) {
        closeStayModal()
        unloadingStatus()
    } else if (validate(statusGenerate.unloaded)) {
        completedStatus()
        setButtonIsDisabled(true)
        showStayAtPickUpMenu()
    } else if (validate(statusGenerate.completed)) {
        successUnloadHandler()
    }
}
