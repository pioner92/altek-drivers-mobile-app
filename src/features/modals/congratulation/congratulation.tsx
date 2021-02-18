import React from 'react';
import { Text} from "react-native";
import {useStore} from "effector-react";
import {
    $animValueCongratulationModal,
    $isMountedCongratulationModal,
    setIsMountedCongratulationModal
} from "./models/models";
import {AlertModalContainer} from "../alert-modal/alert-modal";
import {hideAlertModal} from "../alert-modal/models/models";

export const CongratulationModal: React.FC = () => {

    const value = useStore($animValueCongratulationModal)
    const isMounted = useStore($isMountedCongratulationModal)

    const onPress =() => {
        hideAlertModal({value,callback:()=>setIsMountedCongratulationModal(false)})
    }

    if(isMounted){
        return (
            <AlertModalContainer
                theme='green'
                title='Congratulation'
                enableLeftButton={false}
                rightButtonLabel='Ok'
                onPressRightButton={onPress}
                value={value}
            >
                <Text>You have just completed a load!</Text>
            </AlertModalContainer>
        );
    }
    else {
        return null
    }
};

