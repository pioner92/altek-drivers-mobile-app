import {useEffect} from 'react'
import {AppState} from 'react-native'
import {resetBadgeCount} from '../utils/notification/push-notification'

export const useAppState = () => {
    useEffect(() => {
        AppState.addEventListener('change', handleAppStateChange)
        return () => {
            AppState.removeEventListener('change', handleAppStateChange)
        }
    }, [])
}

const handleAppStateChange = (nextAppState: string) => {
    if (nextAppState === 'background') {
    } else if (nextAppState === 'active') {
        resetBadgeCount()
    }
}
