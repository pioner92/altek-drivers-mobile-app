import React from 'react';
import {Animated, StyleSheet, View} from "react-native";
import {useStore} from "effector-react";
import {useNavigation} from '@react-navigation/native'
import {NavButton} from "../../ui/molecules/nav-button";
import {BidsSVG, ChatSVG, LoadSVG, ProfileSVG} from "../../ui/atoms/icons";
import {useInterpolate} from "../../../utils/animation-hooks/Hooks";
import links from "../../../links.json";
import {$isAvailable} from "../set-available/models";
import {$animValueNavigation} from "./models";
import {$selfStatus, statuses} from "../../../hooks";
import {$selectedIndexNavButton, navButtonIndex, setSelectedIndexNavButton} from "./models/models";
import {Dimensions} from "react-native";
import {$isNewMessageInChat} from "../../../screens/chat/models/models";

const {width} = Dimensions.get('window')

export const ButtonNavigateContainer: React.FC = () => {
    const {navigate} = useNavigation()
    const value = useStore($animValueNavigation)
    const isAvailable = useStore($isAvailable)
    const selfStatus = useStore($selfStatus)
    const selectedIndexNavButton = useStore($selectedIndexNavButton)
    const isNewMessageInChat = useStore($isNewMessageInChat)

    const menuInterpolate = useInterpolate(value, [0, 1], [0, 700])

    const setButtonColor = (index: number) => {
        if (index === selectedIndexNavButton) {
            return '#1672D4'
        }
        if (!isAvailable && index === 1 || !isAvailable && index === 2) {
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

    const animatedStyle = {
        transform: [
            {translateY: menuInterpolate},
            {perspective: 1000}
        ]
    }

    return (
        <Animated.View
            style={[animatedStyle, styles.container]}>
            <View style={styles.container}>
                <NavButton
                    disabled={!isAvailable}
                    style={{color: setButtonColor(navButtonIndex.home)}}
                    Icon={LoadSVG.bind(null, {size: 18, color: setButtonColor(navButtonIndex.home)})}
                    callback={onPressHome}>
                    Home
                </NavButton>
                {selfStatus === statuses.waiting &&
                <NavButton
                    disabled={!isAvailable}
                    style={{color: setButtonColor(navButtonIndex.bids)}}
                    Icon={BidsSVG.bind(null, {size: 18, color: setButtonColor(navButtonIndex.bids)})}
                    callback={onPressBids}>
                    Loads
                </NavButton>
                }

                <NavButton
                    isBadge={isNewMessageInChat}
                    style={{color: setButtonColor(navButtonIndex.chat)}}
                    Icon={ChatSVG.bind(null, {size: 18, color: setButtonColor(navButtonIndex.chat)})}
                    callback={onPressChat}>
                    Chat
                </NavButton>
                <NavButton
                    style={{color: setButtonColor(navButtonIndex.profile)}}
                    Icon={ProfileSVG.bind(null, {size: 18, color: setButtonColor(navButtonIndex.profile)})}
                    callback={onPressProfile}>
                    Profile
                </NavButton>
            </View>
            <View style={{backgroundColor: '#ffffff', width: '100%', height: 100, transform: [{translateY: 30}]}}/>
        </Animated.View>
    );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        height: 59,
        alignItems: 'center',
        justifyContent: 'space-around',
        bottom: 0,
        position: 'absolute',
        right: 0,
        zIndex: 100,
        elevation: 100,
        width: width,
        borderTopRightRadius: 6,
        borderTopLeftRadius: 6
    },
})

