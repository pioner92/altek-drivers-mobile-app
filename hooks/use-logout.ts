import {useEffect} from 'react'
import {useStore} from 'effector-react'
import {$isAuth} from '../Store/Store'
import {useNavigation} from '@react-navigation/native'
import {links} from "../src/navigation/links";

export const useLogout = () => {
    const navigator = useNavigation()
    const isAuth = useStore($isAuth)

    useEffect(() => {
        if (!isAuth) {
            navigator.navigate(links.home)
        }
    }, [isAuth])
}
