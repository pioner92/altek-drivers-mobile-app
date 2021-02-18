import React from 'react';
import { Text} from "react-native";
import {useStore} from "effector-react";
import {
    $isMountedUnavailableModal,
    $animValueUnavailableModal,
     setIsMountedUnavailableModal,
} from "./models";
import {setIsAvailable} from "../../set-available/models";
import {useNavigate} from "../../../lib/hooks";
import links from '../../../../links.json'
import {AlertModalContainer} from "../alert-modal/alert-modal";
import {hideAlertModal} from "../alert-modal/models/models";


export const UnavailableModal: React.FC = () => {
    const navigate = useNavigate()
    const isMounted = useStore($isMountedUnavailableModal)
    const value = useStore($animValueUnavailableModal)


    const unavailable = () => {
        return new Promise((resolve)=>{
            setIsAvailable(false)
            resolve()
        }).then(()=>{
            // navigate(links.notAvailable)
            setIsMountedUnavailableModal(false)
        })
    }

    const onPressYes = () => {
        hideAlertModal({value,callback:unavailable})
    }

    const closeModal = () => {
        hideAlertModal({value,callback:()=>setIsMountedUnavailableModal(false)})
    }

    if(isMounted){
        return (
            <AlertModalContainer
                title={'Do you want to stop working?'}
                leftButtonLabel='No'
                rightButtonLabel='Yes'
                onPressLeftButton={closeModal}
                onPressRightButton={onPressYes}
                value={value}
            >
                <Text>Do you want to stop working?</Text>
            </AlertModalContainer>
        );
    }
    else {
        return null
    }
};

