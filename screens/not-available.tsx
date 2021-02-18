import React, {useEffect} from 'react';
import { StyleSheet, View} from "react-native";
import {LogoScreen} from "../src/ui/molecules/logo";
import {SetAvailable} from "../src/features/set-available";
import {hideSetAvailable, setIsAvailable, showSetAvailable} from "../src/features/set-available/models";
import {hideStartWorkingMenu, showStartWorkingMenu} from "../src/features/start-working-menu/models";
import {StartWorkingMenu} from "../src/features/start-working-menu";
import {StartWorkLetterMenu} from "../src/features/start-working-later-menu";
import {hideStartWorkingLaterMenu, showStartWorkingLaterMenu} from "../src/features/start-working-later-menu/models";
import {useLogout} from "../hooks/use-logout";
import {ScreenWrapper} from "../src/ui/atoms/screen-wrapper/screen-wrapper";

export const NotAvailable: React.FC = () => {

    const openMenu = () => {
        showStartWorkingMenu()
        hideSetAvailable()
    }
    const closeStartWorkingMenu = () => {
        hideStartWorkingMenu()
        showSetAvailable()
    }

    const startWorking = () => {
        setIsAvailable(true)
        closeStartWorkingMenu()
        showSetAvailable()
    }

    const openStartLaterWorkingMenu = () => {
        closeStartWorkingMenu()
        hideSetAvailable()
        showStartWorkingLaterMenu()
    }

    const closeStartLaterWorkingMenu = () => {
        hideStartWorkingLaterMenu()
        showSetAvailable()
    }

    useLogout()

    useEffect(()=>{
        showSetAvailable()
    },[])


    return (
        <>
            <ScreenWrapper  enableNavigateButtons={true}>
                <View style={styles.container}>
                    <LogoScreen/>
                    <SetAvailable callback={openMenu}/>
                </View>
            </ScreenWrapper>
            <StartWorkingMenu
                startWorking={startWorking}
                openStartLaterWorkingMenu={openStartLaterWorkingMenu}
                closeMenu={closeStartWorkingMenu}
            />
            <StartWorkLetterMenu
                closeMenu={closeStartLaterWorkingMenu}
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    }
})