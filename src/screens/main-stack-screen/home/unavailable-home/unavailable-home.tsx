import React, {useEffect} from 'react'
import {StyleSheet, View} from 'react-native'
import {LogoScreen} from '../../../../ui/molecules/logo'
import {SetAvailable} from '../../../../features/set-available'
import {hideSetAvailable, setIsAvailable, showSetAvailable} from '../../../../features/set-available/models'
import {hideStartWorkingMenu, showStartWorkingMenu} from '../../../../features/start-working-menu/models'
import {StartWorkingMenu} from '../../../../features/start-working-menu'
import {StartWorkLetterMenu} from '../../../../features/start-working-later-menu'
import {
    hideStartWorkingLaterMenu,
    showStartWorkingLaterMenu
} from '../../../../features/start-working-later-menu/models'
import {ScreenWrapper} from '../../../../ui/atoms/screen-wrapper/screen-wrapper'


export const UnavailableHome: React.FC = () => {
    const openMenu = () => {
        showStartWorkingMenu()
        hideSetAvailable()
    }
    const closeStartWorkingMenu = () => {
        hideStartWorkingMenu()
        showSetAvailable()
    }

    const startWorking = () => {
        closeStartWorkingMenu()
        setIsAvailable(true)
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
    useEffect(() => {
        showSetAvailable()
    }, [])


    return (
        <>
            <ScreenWrapper enableNavigateButtons={false}>
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
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
})
