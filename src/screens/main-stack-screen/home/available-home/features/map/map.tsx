import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'
import customStyleMap from '../../../../../../../customMapStyle.json'
import React, {memo} from 'react'
import {useStore} from 'effector-react'
import {geoLocationStore} from '../../../../../../../Store/Store'
import {$currentLoad} from '../../../../load-info/models'
import {$selfStatus, statuses} from '../../../../../../../hooks'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {Dimensions} from 'react-native'

const height = Dimensions.get('window').height

enum locationPoints {
    start = 'start_location',
    end = 'end_location'
}

const MapInner: React.FC = () => {
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

    const pointTitle =() => {
        if (uploadCheck) {
            return 'Pick-Up Point'
        } else if (unloadCheck) {
            return 'Delivery Point'
        }
    }

    const statusesChecker =() => {
        return selfStatus !== statuses.completed && selfStatus !== statuses.waiting
    }

    const geolocationService =() => {
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


    return (
        <MapView
            provider={PROVIDER_GOOGLE}

            style={{height: height, width: '100%', marginTop: -inset.top}}
            customMapStyle={customStyleMap}
            showsUserLocation={true}
            region={{
                latitude: geolocationService().latitude,
                longitude: geolocationService().longitude,
                latitudeDelta: 0.09,
                longitudeDelta: 0.035,
            }}>

            {
                statusesChecker() ?
                    <Marker
                        title={pointTitle()}
                        coordinate={geolocationService()}/> :
                    null
            }
        </MapView>
    )
}

export const Map = memo(MapInner)
