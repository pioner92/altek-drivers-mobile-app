import React, {useEffect} from 'react'
import {$isAvailable} from '../src/features/set-available/models'
import {Main} from './main'
import {NotAvailable} from './not-available'
import {useStore} from 'effector-react'
import {NotificationsHandler} from '../utils/notification/push-notification'
import {useNavigate} from '../src/lib/hooks'
import links from '../links.json'
import {chatContentPropsType} from './chat/chat-content/chat-content'
import {FirebaseService} from '../utils/firebase-serivce/firebase-service'
import {StackScreenCreator} from '../src/features/navigation/features/stack-screen-creator/stack-screen-creator'
import {$currentLoad} from './load-info/models'

export const Home: React.FC = () => {
    const isAvailable = useStore($isAvailable)
    const navigate = useNavigate()
    const currentLoad = useStore($currentLoad)


    const openChat = ({id}: chatContentPropsType) => {
        navigate(links.chatContent, {id})
    }

    useEffect(() => {
        NotificationsHandler(openChat)
        FirebaseService.onOpenHandler(openChat)
    }, [])

    useEffect(() => {
        if (isAvailable && !currentLoad?.hasOwnProperty('id')) {
            navigate(links.bids)
        }
    }, [isAvailable])

    return (isAvailable ? <Main/> : <NotAvailable/>)
}

export const HomeStackScreen = () => StackScreenCreator({
    link: links.home,
    component: Home,
    title: 'Home',
    headerShown: false,
})


