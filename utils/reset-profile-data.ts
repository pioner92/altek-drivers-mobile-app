import {setDb} from "./db/set-db";
import {COMPANYHASH, EMAIL, GROUPID, ISAVAILABLE, PASSWORD, PHONENUMBER, USERID} from "./db/constants";
import {hideArrivedMenu} from "../src/features/arrived-menu/models";

export const resetUserData =async () => {
    return await Promise.all([
        setDb(ISAVAILABLE, 'false'),
        setDb(EMAIL, ''),
        setDb(PASSWORD, ''),
        setDb(PHONENUMBER, ''),
        setDb(USERID, ''),
        setDb(GROUPID, ''),
        setDb(COMPANYHASH, ''),
    ])
}
