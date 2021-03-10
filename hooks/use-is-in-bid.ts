import {useEffect} from 'react'
import {FirebaseService} from '../utils/firebase-serivce/firebase-service'
import {$currentLoad} from '../src/screens/main-stack-screen/load-info/models'

export const useIsInBid = () => {
    useEffect(()=>{
        if ($currentLoad.getState()?.id === undefined) {
            FirebaseService.topicUnsubscribe('all')
        } else {
            FirebaseService.topicSubscribe('all')
        }
    }, [$currentLoad.getState()])
}
