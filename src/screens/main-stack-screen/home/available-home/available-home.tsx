import React, {useEffect} from 'react'
import {setGeoLocationEvent} from '../../../../../Store/Store'
import {useStore} from 'effector-react'
import {getCurrentGeo} from '../../../../lib/get-current-geo'
import {NewLoadOffer} from '../../../../features/new-load-offer/new-load-offer'
import {
    $animValueUnavailableModal,
    setIsMountedUnavailableModal,
} from '../../../../features/modals/unavailable/models/models'
import {UnavailableModal} from '../../../../features/modals/unavailable'
import {ArrivedMenuContainer} from '../../../../features/arrived-menu-container'
import {StayAtPickUp} from '../../../../features/stay-at-pick-up'
import {SetAvailable} from '../../../../features/set-available'
import {$isAvailable} from '../../../../features/set-available/models/models'
import {$currentLoad} from '../../load-info/models'
import {checkStatusesWithInit} from '../../../../lib/check-statuses-with-init/check-statuses-with-init'
import {ScreenWrapper} from '../../../../ui/atoms/screen-wrapper/screen-wrapper'
import {showAlertModal} from '../../../../features/modals/alert-modal/models/models'
import {ConfirmationFromDispatcher} from '../../../../features/modals/confirmation-from-dispatcher/confirmation-from-dispatcher'
import {CongratulationModal} from '../../../../features/modals/congratulation/congratulation'
import {$arrivedMenuAnimValue, slideToBottomArrivedMenu} from '../../../../features/arrived-menu/models/models'
import {DarkBgAnimated} from './features/dark-bg-animated/dark-bg-animated'
import {ConfirmArrivedContainer} from '../../../../features/modals/confirm-arrived/confirm-arrived-container'
import {Map} from './features/map/map'

export const AvailableHome = () => {
    const isAvailable = useStore($isAvailable)
    const currentLoad = useStore($currentLoad)
    const arrivedMenuAnimValue = useStore($arrivedMenuAnimValue)
    const animValueUnavailableModal = useStore($animValueUnavailableModal)


    const openUnavailableModal = () => {
        if (isAvailable && !currentLoad?.hasOwnProperty('id')) {
            setIsMountedUnavailableModal(true)
            showAlertModal(animValueUnavailableModal)
        }
    }


    useEffect(() => {
        if (currentLoad?.company) {
            const status = currentLoad.status
            const substatus = currentLoad.substatus
            checkStatusesWithInit(status, substatus)
        }
    }, [currentLoad])

    useEffect(() => {
        getCurrentGeo()
            .then((data) => {
                setGeoLocationEvent({latitude: data.latitude, longitude: data.longitude})
            })
    }, [])


    return (
        <>
            <ScreenWrapper safeAreaStyle={{backgroundColor: '#fff'}}>
                <Map/>
                <DarkBgAnimated
                    onPress={slideToBottomArrivedMenu}
                    animatedValue={arrivedMenuAnimValue}
                />
                <SetAvailable callback={openUnavailableModal}/>
                <ArrivedMenuContainer/>
                <StayAtPickUp/>
                <ConfirmArrivedContainer/>
                <UnavailableModal/>
                <ConfirmationFromDispatcher/>
                <CongratulationModal/>
            </ScreenWrapper>
            <NewLoadOffer/>
        </>
    )
}

