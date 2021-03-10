import {successUploadHandler} from './success-upload-handler'
import {successUnloadHandler} from './success-unload-handler'
import {completedStatus, toUploadStatus, unloadingStatus, uploadingStatus} from '../../../../hooks'
import {hideStayAtPickUpMenu, showStayAtPickUpMenu} from '../../../features/stay-at-pick-up/models/models'
import {setButtonIsDisabled} from '../../../features/arrived-menu/models'


const closeStayModal = (substatus:number)=> {
    if (substatus === 1) {
        hideStayAtPickUpMenu()
        setButtonIsDisabled(false)
    }
}

export const statusesHandler = (status: number, substatus: number) => {
    switch (status) {
    case 2:
        toUploadStatus()
        break
    case 3:
        closeStayModal(substatus)
        uploadingStatus()
        break
    case 4:
        successUploadHandler()
        break
    case 5:
        closeStayModal(substatus)
        if (substatus === 2) {
            completedStatus()
            setButtonIsDisabled(true)
            showStayAtPickUpMenu()
        } else {
            unloadingStatus()
        }

        break
    case 6:
        successUnloadHandler()
        break
    default:
        return
    }
}
