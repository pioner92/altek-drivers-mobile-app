import {AlertModal} from '../../../../../../../ui/molecules/alert-modal/alert-modal'
import {StyleSheet, Text} from 'react-native'
import {styleConfig} from '../../../../../../../StyleConfig'
import React from 'react'
import {useStore} from 'effector-react'
import {
    $animValueAlertErrorPlaceMultipleBid,
    $isMountedAlertErrorPlaceMultipleBid,
    hideAlertErrorPlaceMultipleBid,
} from './models/models'
import {useInterpolate} from '../../../../../../../lib/animation-hooks/Hooks'


export const AlertErrorPlaceMultipleBid: React.FC = () => {
    const animValue = useStore($animValueAlertErrorPlaceMultipleBid)
    const isMounted = useStore($isMountedAlertErrorPlaceMultipleBid)
    const opacityInterpolate = useInterpolate(animValue, [0, 1], [0, 1])

    const closeModal = () => {
        hideAlertErrorPlaceMultipleBid()
    }

    const opacity = {
        opacity: opacityInterpolate,
    }

    if (!isMounted) {
        return null
    }

    return (
        <AlertModal title={'Error'} rightButtonLabel="Ok" onPressRightButton={closeModal} animStyle={opacity}>
            <Text style={styles.text}>You can't bid on multiple loads. Please wait until the dispatcher works on your previous bid.</Text>
        </AlertModal>
    )
}


const styles = StyleSheet.create({
    text: {
        fontFamily: 'IBMPlex-500',
        color: styleConfig.textColor.dark,
        fontSize: 16,
        lineHeight: 21,
        letterSpacing: -0.01,
        textAlign: 'center',
    },
})
