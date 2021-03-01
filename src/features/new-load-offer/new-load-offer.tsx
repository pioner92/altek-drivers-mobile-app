import React from 'react'
import {Animated, StyleSheet, Text} from 'react-native'
import {useStore} from 'effector-react'
import {useInterpolate} from '../../../utils/animation-hooks/Hooks'
import {NewLoadOfferMenu} from '../../ui/organisms/menu/new-load-offer'
import {$isMountedNewLoadOfferMenu, $newLoadOfferAnimValue} from './models'
import {DarkBg} from '../../ui/atoms/dark-bg'
import {toUploadStatus} from '../../../hooks/delivery-hooks'
import {showArrivedMenu} from '../arrived-menu/models'
import {hideNewLoadOfferMenu} from './models/models'
import {statusGenerate} from '../../../utils/check-statuses-with-init/check-statuses-with-init'
import {CardTopModal} from '../../ui/molecules/card-top-modal/card-top-modal'
import {styleConfig} from '../../StyleConfig'
import {sendStatusToServerSocketAction} from '../../api/socket-client/socket-actions/socket-actions'


export const NewLoadOffer: React.FC = () => {
    const isMounted = useStore($isMountedNewLoadOfferMenu)
    const value = useStore($newLoadOfferAnimValue)

    const menuInterpolateY = useInterpolate(value, [0, 1], [500, 0])
    const modalInterpolateY = useInterpolate(value, [0, 1], [-500, 23])
    const opacityInterpolate = useInterpolate(value, [0, 1], [0, 1])

    const animMenuStyle = {
        transform: [
            {translateY: menuInterpolateY},
        ],
    }
    const animModalStyle = {
        transform: [
            {translateY: modalInterpolateY},
        ],
    }

    const accept = () => {
        sendStatusToServerSocketAction({...statusGenerate.toUpload})
        hideNewLoadOfferMenu()
        toUploadStatus()
        showArrivedMenu()
    }

    const animStyle = {
        opacity: opacityInterpolate,
    }


    if (isMounted) {
        return (
            <Animated.View style={[styles.anim, animStyle]}>
                <DarkBg>
                    <CardTopModal style={animModalStyle} title='New load offer' labelWrapperColor='green'>
                        <Text style={styles.modalContentText}>You have been assigned to a load</Text>
                    </CardTopModal>
                    <NewLoadOfferMenu closeMenu={accept} animStyle={animMenuStyle}/>
                </DarkBg>
            </Animated.View>
        )
    } else {
        return null
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        zIndex: 101,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    anim: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        zIndex: 101,
    },
    modalContentText: {
        color: styleConfig.textColor.dark,
    },
})
