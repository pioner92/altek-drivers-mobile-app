import React from 'react'
import {useStore} from 'effector-react'
import {$selfStatus, statuses} from '../../../hooks'
import {ArrivedMenu} from '../arrived-menu'
import {useNavigate} from '../../lib/hooks'
import links from '../../../links.json'
import {$currentLoad} from '../../../screens/main-stack-screen/load-info/models'
import {$confirmArrivedAnimValue, setIsMountedConfirmArrivedModal} from '../modals/confirm-arrived/models'
import {showAlertModal} from '../modals/alert-modal/models/models'

export const ArrivedMenuContainer: React.FC = () => {
    const selfStatus = useStore($selfStatus)
    const navigate = useNavigate()
    const currentLoad = useStore($currentLoad)
    const value = useStore($confirmArrivedAnimValue)

    const arrivedToPickUp = () => {
        setIsMountedConfirmArrivedModal(true)
        showAlertModal(value)
    }

    const Loaded = () => {
        navigate(links.loadingVerified1)
    }

    const arrivedToDelivery = () => {
        setIsMountedConfirmArrivedModal(true)
        showAlertModal(value)
    }

    const unloading = () => {
        navigate(links.unloading)
    }

    const menuDataGenerate = (title: string, label: string, dateTitle: string, callback: () => void, address: string, date: string) =>
        ({title, label, callback, address, date, dateTitle})


    const menuData = () => {
        switch (selfStatus) {
        case statuses.toUpload:
            return menuDataGenerate('In Transit to Pick-up', 'Arrived to Pick-Up', 'Pick-up time', arrivedToPickUp, currentLoad?.pickUpAt || '*', currentLoad?.pick_up_date || '')
        case statuses.uploading:
            return menuDataGenerate('Arrived to Pick-Up', 'Loaded', 'Pick-up time', Loaded, currentLoad?.pickUpAt || '*', currentLoad?.pick_up_date || '')
        case statuses.toUnload:
            return menuDataGenerate('In Transit to Delivery', 'Arrived to Delivery', 'Delivery time', arrivedToDelivery, currentLoad?.deliverTo || '*', currentLoad?.delivery_date || 'Direct')
        case statuses.unloading:
            return menuDataGenerate('Arrived to Delivery', 'Unloading', 'Delivery time', unloading, currentLoad?.deliverTo || '*', currentLoad?.delivery_date || 'Direct')
        case statuses.completed:
            return menuDataGenerate('Arrived to Delivery', 'Completed', 'Delivery time', () => {
            }, currentLoad?.deliverTo || '*', currentLoad?.delivery_date || 'Direct')
        default:
            return menuDataGenerate('*', '*', '*', () => {
            }, '*', '*')
        }
    }

    if (selfStatus !== statuses.waiting) {
        const {title, label, callback, date, address, dateTitle} = menuData()
        return (
            <ArrivedMenu
                dateTitle={dateTitle}
                accept={callback}
                address={address}
                date={date}
                btnLabel={label}
                title={title}/>
        )
    } else {
        return null
    }
}
