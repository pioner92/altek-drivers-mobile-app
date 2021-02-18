import React, { useEffect} from 'react';
import { View} from "react-native";
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
import customStyleMap from "../../customMapStyle.json";
import {geoLocationStore, setGeoLocationEvent} from "../../Store/Store";
import {useStore} from "effector-react";
import {getCurrentGeo} from "../../utils/get-current-geo";
import {NewLoadOffer} from "../../src/features/new-load-offer/new-load-offer";
import {
    $animValueUnavailableModal,
    setIsMountedUnavailableModal
} from "../../src/features/modals/unavailable/models/models";
import {UnavailableModal} from "../../src/features/modals/unavailable";
import {$selfStatus} from "../../hooks";
import {ArrivedMenuContainer} from "../../src/features/arrived-menu-container";
import {StayAtPickUp} from "../../src/features/stay-at-pick-up";
import {SetAvailable} from "../../src/features/set-available";
import {statuses} from "../../hooks/delivery-hooks";
import {$isAvailable} from "../../src/features/set-available/models/models";
import {$currentLoad} from "../load-info/models";
import {checkStatusesWithInit} from "../../utils/check-statuses-with-init/check-statuses-with-init";
import {useLogout} from "../../hooks/use-logout";
import {ScreenWrapper} from "../../src/ui/atoms/screen-wrapper/screen-wrapper";
import { showAlertModal} from "../../src/features/modals/alert-modal/models/models";
import {ConfirmationFromDispatcher} from "../../src/features/modals/confirmation-from-dispatcher/confirmation-from-dispatcher";
import {CongratulationModal} from "../../src/features/modals/congratulation/congratulation";
import {
    slideToBottomArrivedMenu
} from "../../src/features/arrived-menu/models/models";
import {DarkBgAnimated} from "./features/dark-bg-animated/dark-bg-animated";
import {ConfirmArrivedContainer} from "../../src/features/modals/confirm-arrived/confirm-arrived-container";


enum locationPoints {
    start = 'start_location',
    end = 'end_location'
}

export const Main = () => {
    const isAvailable = useStore($isAvailable)
    const geo = useStore(geoLocationStore)
    const selfStatus = useStore($selfStatus)
    const currentLoad = useStore($currentLoad)


    const openUnavailableModal = () => {
        if (isAvailable && !currentLoad?.hasOwnProperty('id')) {
            setIsMountedUnavailableModal(true)
            showAlertModal($animValueUnavailableModal.getState())
        }
    }


    const statusChecker = (point: locationPoints): { latitude: number, longitude: number } => {
        console.log("StatusChecker")
        if (currentLoad && currentLoad[point]) {
            const coordinates = currentLoad[point].split(',')
            if (coordinates && coordinates.length >= 2) {
                return ({
                    latitude: +coordinates[0],
                    longitude: +coordinates[1],
                })
            } else {
                return ({
                    latitude: geo.latitude,
                    longitude: geo.longitude
                })
            }
        } else {
            return ({
                latitude: geo.latitude,
                longitude: geo.longitude
            })
        }
    }

    const uploadCheck = selfStatus === statuses.toUpload || selfStatus === statuses.uploading
    const unloadCheck = selfStatus == statuses.toUnload || selfStatus === statuses.unloading

    const pointChecker = () => {
        if (uploadCheck) {
            return 'Pick-Up Point'
        } else if (unloadCheck) {
            return 'Delivery Point'
        }
    }

    const statusesChecker = () => {
        return selfStatus !== statuses.completed && selfStatus !== statuses.waiting
    }

    const geolocationService = () => {
        if (uploadCheck) {
            return statusChecker(locationPoints.start)
        } else if (unloadCheck) {
            return statusChecker(locationPoints.end)
        }

        return ({
            latitude: geo.latitude,
            longitude: geo.longitude,
        })
    }

    useEffect(() => {
        if (currentLoad) {
            const status = currentLoad.status
            const substatus = currentLoad.substatus
            checkStatusesWithInit(status, substatus)
        }
        currentLoad?.start_location

    }, [currentLoad])

    useEffect(() => {
        getCurrentGeo()
            .then((data) => {
                setGeoLocationEvent({latitude: data.latitude, longitude: data.longitude})
            })
    }, [])


    useLogout()


    return (
        <>
            <ScreenWrapper enableNavigateButtons={true}>
                <View>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={{width: '100%', height: '100%'}}
                        customMapStyle={customStyleMap}
                        showsUserLocation={true}
                        region={{
                            latitude: geolocationService().latitude,
                            longitude: geolocationService().longitude,
                            latitudeDelta: 0.09,
                            longitudeDelta: 0.035
                        }}>

                        {
                            statusesChecker() ?
                                <Marker
                                    title={pointChecker()}
                                    coordinate={geolocationService()}/>
                                : null
                        }

                    </MapView>
                    <DarkBgAnimated onPress={slideToBottomArrivedMenu}/>
                    <SetAvailable callback={openUnavailableModal}/>
                    <ArrivedMenuContainer/>
                    <StayAtPickUp/>
                    <ConfirmArrivedContainer/>
                    <UnavailableModal/>
                    <ConfirmationFromDispatcher/>
                    <CongratulationModal/>
                </View>
            </ScreenWrapper>
            <NewLoadOffer/>
        </>
    );
};

