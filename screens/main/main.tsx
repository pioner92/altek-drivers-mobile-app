import React, {useEffect} from 'react'
import {setGeoLocationEvent} from '../../Store/Store'
import {useStore} from 'effector-react'
import {getCurrentGeo} from '../../utils/get-current-geo'
import {NewLoadOffer} from '../../src/features/new-load-offer/new-load-offer'
import {
    $animValueUnavailableModal,
    setIsMountedUnavailableModal,
} from '../../src/features/modals/unavailable/models/models'
import {UnavailableModal} from '../../src/features/modals/unavailable'
import {ArrivedMenuContainer} from '../../src/features/arrived-menu-container'
import {StayAtPickUp} from '../../src/features/stay-at-pick-up'
import {SetAvailable} from '../../src/features/set-available'
import {$isAvailable} from '../../src/features/set-available/models/models'
import {$currentLoad} from '../load-info/models'
import {checkStatusesWithInit} from '../../utils/check-statuses-with-init/check-statuses-with-init'
import {ScreenWrapper} from '../../src/ui/atoms/screen-wrapper/screen-wrapper'
import {showAlertModal} from '../../src/features/modals/alert-modal/models/models'
import {ConfirmationFromDispatcher} from '../../src/features/modals/confirmation-from-dispatcher/confirmation-from-dispatcher'
import {CongratulationModal} from '../../src/features/modals/congratulation/congratulation'
import {$arrivedMenuAnimValue, slideToBottomArrivedMenu} from '../../src/features/arrived-menu/models/models'
import {DarkBgAnimated} from './features/dark-bg-animated/dark-bg-animated'
import {ConfirmArrivedContainer} from '../../src/features/modals/confirm-arrived/confirm-arrived-container'
import {Map} from '../main/features/map/map'
import {StackScreenCreator} from '../../src/features/navigation/features/stack-screen-creator/stack-screen-creator'
import links from '../../links.json'

export const Main = () => {
    const isAvailable = useStore($isAvailable)
    const currentLoad = useStore($currentLoad)


    const openUnavailableModal = () => {
        if (isAvailable && !currentLoad?.hasOwnProperty('id')) {
            setIsMountedUnavailableModal(true)
            showAlertModal($animValueUnavailableModal.getState())
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
            <ScreenWrapper enableNavigateButtons={false} safeAreaStyle={{backgroundColor: '#fff'}}>
                <Map/>
                <DarkBgAnimated
                    onPress={slideToBottomArrivedMenu}
                    animatedValue={$arrivedMenuAnimValue.getState()}
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

export const MainStackScreen = ()=> StackScreenCreator({headerShown: false, component: Main, link: links.home, title: ''})
