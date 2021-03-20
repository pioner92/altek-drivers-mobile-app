import {useStore} from 'effector-react'
import {hideAlertErrorPlaceMultipleBid} from '../alert-error-place-multiple-bid/models/models'
import {useInterpolate} from '../../../../../../../lib/animation-hooks/Hooks'
import {AlertModal} from '../../../../../../../ui/molecules/alert-modal/alert-modal'
import {StyleSheet, Text} from 'react-native'
import React from 'react'
import {styleConfig} from '../../../../../../../StyleConfig'
import {$animValueAlertCancelBid, $isMountedAlertCancelBid, hideAlertCancelBid} from './models/models'


type propsType = {
    onPressYes: () => void
}

export const AlertCancelBid: React.FC<propsType> = ({onPressYes}) => {
    const animValue = useStore($animValueAlertCancelBid)
    const isMounted = useStore($isMountedAlertCancelBid)
    const opacityInterpolate = useInterpolate(animValue, [0, 1], [0, 1])

    const closeModal = () => {
        hideAlertCancelBid()
    }

    const onPressYesHandler = () => {
        onPressYes()
        hideAlertErrorPlaceMultipleBid()
    }

    const opacity = {
        opacity: opacityInterpolate,
    }

    if (!isMounted) {
        return null
    }

    return (
        <AlertModal
            title='Confirmation'
            enableLeftButton={true}
            rightButtonLabel="Yes"
            leftButtonLabel='No'
            onPressLeftButton={closeModal}
            onPressRightButton={onPressYesHandler}
            animStyle={opacity}
        >
            <Text style={styles.text}>Are you sure you want to cancel your bid?</Text>
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
