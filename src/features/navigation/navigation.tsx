import React from 'react'
import {Dimensions, StyleSheet, View} from 'react-native'
import {useStore} from 'effector-react'
import {useNavigation} from '@react-navigation/native'
import {NavButton} from '../../ui/molecules/nav-button'
import {BidsSVG, ChatSVG, LoadSVG, ProfileSVG} from '../../ui/atoms/icons'
import links from '../../../links.json'
import {$isAvailable} from '../set-available/models'
import {$selfStatus, statuses} from '../../../hooks'
import {$selectedIndexNavButton, navButtonIndex, setSelectedIndexNavButton} from './models/models'
import {$isNewMessageInChat} from '../../../screens/chat/models/models'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

const {width} = Dimensions.get('window')

export const ButtonNavigateContainer: React.FC = () => {
    const insets = useSafeAreaInsets()


    const {navigate} = useNavigation()
    const isAvailable = useStore($isAvailable)
    const selfStatus = useStore($selfStatus)
    const selectedIndexNavButton = useStore($selectedIndexNavButton)
    const isNewMessageInChat = useStore($isNewMessageInChat)


    const setButtonColor = (index: number) => {
        if (index === selectedIndexNavButton) {
            return '#1672D4'
        }
        if (!isAvailable && index === 2) {
            return '#808993'
        }
        return '#1F2934'
    }


    const onPressHome = () => {
        navigate(links.home)
        setSelectedIndexNavButton(navButtonIndex.home)
    }

    const onPressBids = () => {
        if (isAvailable) {
            navigate(links.bids)
            setSelectedIndexNavButton(navButtonIndex.bids)
        }
    }

    const onPressChat = () => {
        navigate(links.chat)
        setSelectedIndexNavButton(navButtonIndex.chat)
    }

    const onPressProfile = () => {
        navigate(links.profile)
        setSelectedIndexNavButton(navButtonIndex.profile)
    }


    return (
        <View style={[styles.container,
            {bottom: -insets.bottom, height: 59 + insets.bottom},
        ]}>
            <View style={styles.wrapper}>
                <NavButton
                    style={{color: setButtonColor(navButtonIndex.home)}}
                    Icon={LoadSVG.bind(null, {size: 19, color: setButtonColor(navButtonIndex.home)})}
                    callback={onPressHome}>
                    Home
                </NavButton>
                {selfStatus === statuses.waiting &&
                <NavButton
                    disabled={!isAvailable}
                    style={{color: setButtonColor(navButtonIndex.bids)}}
                    Icon={BidsSVG.bind(null, {size: 19, color: setButtonColor(navButtonIndex.bids)})}
                    callback={onPressBids}>
                    Loads
                </NavButton>
                }

                <NavButton
                    isBadge={isNewMessageInChat}
                    style={{color: setButtonColor(navButtonIndex.chat)}}
                    Icon={ChatSVG.bind(null, {size: 19, color: setButtonColor(navButtonIndex.chat)})}
                    callback={onPressChat}>
                    Chat
                </NavButton>
                <NavButton
                    style={{color: setButtonColor(navButtonIndex.profile)}}
                    Icon={ProfileSVG.bind(null, {size: 19, color: setButtonColor(navButtonIndex.profile)})}
                    callback={onPressProfile}>
                    Profile
                </NavButton>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({

    container: {
        backgroundColor: '#fff',
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        bottom: 0,
        position: 'absolute',
        right: 0,
        zIndex: 100,
        elevation: 100,
        width: width,
    },
    wrapper: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
})

