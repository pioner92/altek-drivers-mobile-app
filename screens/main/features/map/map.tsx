import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'
import customStyleMap from '../../../../customMapStyle.json'
import React, {memo, useMemo} from 'react'
import {useStore} from 'effector-react'
import {geoLocationStore} from '../../../../Store/Store'
import {$currentLoad} from '../../../load-info/models'
import {$selfStatus, statuses} from '../../../../hooks'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {Dimensions} from 'react-native'

type propsType = {}

const height = Dimensions.get('window').height

enum locationPoints {
    start = 'start_location',
    end = 'end_location'
}

const origin = {latitude: 37.785834, longitude: -122.406417}


const MapInner: React.FC<propsType> = () => {
    const inset = useSafeAreaInsets()

    const geo = useStore(geoLocationStore)
    const currentLoad = useStore($currentLoad)
    const selfStatus = useStore($selfStatus)


    const statusChecker = (point: locationPoints): { latitude: number, longitude: number } => {
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
                    longitude: geo.longitude,
                })
            }
        } else {
            return ({
                latitude: geo.latitude,
                longitude: geo.longitude,
            })
        }
    }

    const uploadCheck = selfStatus === statuses.toUpload || selfStatus === statuses.uploading
    const unloadCheck = selfStatus == statuses.toUnload || selfStatus === statuses.unloading

    const pointTitle = useMemo(() => {
        if (uploadCheck) {
            return 'Pick-Up Point'
        } else if (unloadCheck) {
            return 'Delivery Point'
        }
    }, [selfStatus])

    const statusesChecker = useMemo(() => {
        return selfStatus !== statuses.completed && selfStatus !== statuses.waiting
    }, [selfStatus])

    const geolocationService = useMemo(() => {
        if (uploadCheck) {
            return statusChecker(locationPoints.start)
        } else if (unloadCheck) {
            return statusChecker(locationPoints.end)
        }
        return ({
            latitude: geo.latitude,
            longitude: geo.longitude,
        })
    }, [selfStatus, geo])


    return (
        <MapView
            provider={PROVIDER_GOOGLE}

            style={{height: height, width: '100%', marginTop: -inset.top}}
            customMapStyle={customStyleMap}
            showsUserLocation={true}
            initialRegion={{
                latitude: origin.latitude,
                longitude: origin.longitude,
                latitudeDelta: 0.09,
                longitudeDelta: 0.035,
            }}
            region={{
                latitude: geolocationService.latitude,
                longitude: geolocationService.longitude,
                latitudeDelta: 0.09,
                longitudeDelta: 0.035,
            }}>

            {
                statusesChecker ?
                    <Marker
                        title={pointTitle}
                        coordinate={geolocationService}/> :
                    null
            }
        </MapView>
    )
}

export const Map = memo(MapInner)