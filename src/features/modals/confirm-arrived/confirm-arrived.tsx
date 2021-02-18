import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {useStore} from "effector-react";
import {useInterpolate} from "../../../../utils/animation-hooks/Hooks";
import {
    $confirmArrivedAnimValue,
    $isMountedConfirmArrivedModal,
    setIsMountedConfirmArrivedModal
} from "./models";
import {AlertModal} from "../../../ui/molecules/alert-modal/alert-modal";
import {AlertModalContainer} from "../alert-modal/alert-modal";
import {hideAlertModal} from "../alert-modal/models/models";


type propsType = {
    callback: () => void
}

export const ConfirmArrived: React.FC<propsType> = ({children, callback}) => {
    const isMounted = useStore($isMountedConfirmArrivedModal)

    const value = useStore($confirmArrivedAnimValue)

    const onClickYes = () => {
        callback()
    }
    const onClickNo = () => {
        hideAlertModal({value,callback:()=>setIsMountedConfirmArrivedModal(false)})
    }


    if (isMounted) {
        return (
            <AlertModalContainer
                title='Confirmation'
                leftButtonLabel='No'
                rightButtonLabel='Yes'
                enableLeftButton={true}
                onPressLeftButton={onClickNo}
                onPressRightButton={onClickYes}
                value={value}>
                <Text style={styles.title}>Do you confirm that you arrived to </Text>
                <Text style={styles.direction}>{children}</Text>
            </AlertModalContainer>
        );
    } else {
        return null
    }
};

const styles = StyleSheet.create({

    title: {
        fontSize: 14,
        fontFamily: 'IBMPlex-400',
        lineHeight: 18,
        color: '#1F2934'
    },
    direction: {
        color: '#1F2934',
        fontSize: 16,
        fontFamily: 'IBMPlex-500',
        lineHeight: 21
    }
})
