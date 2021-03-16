import {useEffect} from 'react'
import {FirebaseService} from '../firebase-serivce/firebase-service'
import {loadType} from '../../api/rest/loads/types'

export const useIsInBid = (load:loadType | null) => {
    useEffect(()=>{
        if (load?.id === undefined) {
            FirebaseService.topicUnsubscribe('all')
        } else {
            FirebaseService.topicSubscribe('all')
        }
    }, [load])
}
