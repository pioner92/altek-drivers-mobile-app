import {Text} from 'react-native'
import {AlertModal} from '../../../../../../../ui/molecules/alert-modal/alert-modal'
import {styleConfig} from '../../../../../../../StyleConfig'
import React from 'react'
import {useInterpolate} from '../../../../../../../lib/animation-hooks/Hooks'
import {useStore} from 'effector-react'
import {$animValuePlaceBidErrorModal, $isMountedPlaceBidErrorModal, hidePlaceBidErrorModal} from './models/models'


export const AlertErrorPlaceBid: React.FC = () => {
    const animValue = useStore($animValuePlaceBidErrorModal)
    const opacityInterpolate = useInterpolate(animValue, [0, 1], [0, 1])
    const isMounted = useStore($isMountedPlaceBidErrorModal)

    const closeModal = () => {
        hidePlaceBidErrorModal()
    }

    const opacity = {
        opacity: opacityInterpolate,
    }

    if (!isMounted) {
        return null
    }

    return (
        <AlertModal title={'Error'} rightButtonLabel="Ok" onPressRightButton={closeModal} animStyle={opacity}>
            <Text style={{
                fontFamily: 'IBMPlex-500',
                color: styleConfig.textColor.dark,
                fontSize: 14,
                textAlign: 'center',
            }}>This load was deleted</Text>
        </AlertModal>
    )
}
