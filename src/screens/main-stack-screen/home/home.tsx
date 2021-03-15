import React, {useEffect} from 'react'
import {$isAvailable} from '../../../features/set-available/models'
import {AvailableHome} from './available-home'
import {UnavailableHome} from './unavailable-home/unavailable-home'
import {useStore} from 'effector-react'
import {actionsType, NotificationsHandler, pushActions} from '../../../../utils/notification/push-notification'
import {useNavigate} from '../../../lib/hooks'
import {FirebaseService} from '../../../../utils/firebase-serivce/firebase-service'
import {StackScreenCreator} from '../../../features/navigation/features/stack-screen-creator/stack-screen-creator'
import {$currentLoad} from '../load-info/models'
import {getLoadData} from '../../../api/rest/loads/get-load-data'
import {$socketStore, closeSocket, initSocket} from '../../../api/socket-client/socket-client'
import {$companyHash} from '../../../../Store/user-data'
import {getDb} from '../../../../utils/db'
import {TOKEN} from '../../../../utils/db/constants'
import {links} from '../../../navigation/links'


const createHandler = ({action, callback}: { action: actionsType, callback: ({id}: { id: number }) => void }) => {
    return ({action, callback})
}

export const Home: React.FC = () => {
    const isAvailable = useStore($isAvailable)
    const navigate = useNavigate()
    const currentLoad = useStore($currentLoad)
    const companyHash = useStore($companyHash)
    const socketClient = useStore($socketStore)

    const openChat = createHandler({
        action: pushActions.newChatSms, callback: ({id}) => {
            id ?? navigate(links.chatContent, {id})
        },
    })

    const openBid = createHandler({
        action: pushActions.newLoad, callback: async ({id}) => {
            const item = await getLoadData(+id)
            if (item?.load_data?.id) {
                navigate(links.bidDetail, {item: item?.load_data})
            }
        },
    })

    const handlers = [openChat, openBid]


    const socketConnect = async (companyHash:string) => {
        if (!socketClient || socketClient?.readyState === socketClient?.CLOSED) {
            const token = await getDb(TOKEN)
            token && initSocket({companyHash, token})
        }
    }

    useEffect(()=>{
        if (companyHash) {
            socketConnect(companyHash)
        }
    }, [companyHash])


    useEffect(() => {
        NotificationsHandler(handlers)
        FirebaseService.onOpenHandler(openChat.callback)
        return closeSocket
    }, [])

    useEffect(() => {
        if (isAvailable && !currentLoad?.hasOwnProperty('id')) {
            navigate(links.bids)
        }
    }, [isAvailable])

    return (isAvailable ? <AvailableHome/> : <UnavailableHome/>)
}

export const HomeStackScreen = () => StackScreenCreator({
    link: links.home,
    component: Home,
    title: 'Home',
    headerShown: false,
})


