import {successUploadHandler} from "./success-upload-handler";
import {successUnloadHandler} from "./success-unload-handler";


export const statusesHandler = (status: number) => {
    switch (status) {
        case 4:
            successUploadHandler();
            break;
        case 6:
            successUnloadHandler();
            break;
        default:
            return
    }
}
