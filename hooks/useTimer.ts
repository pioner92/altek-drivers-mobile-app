import {useEffect} from 'react'

export const useTimer = (callback: () => void) => {
    useEffect(() => {
        const timer = setInterval(() => {
            callback()
        }, 1000)
        return () => clearInterval(timer)
    }, [])
}
