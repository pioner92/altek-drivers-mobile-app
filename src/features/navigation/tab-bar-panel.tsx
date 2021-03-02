import {BottomTabBarProps} from '@react-navigation/bottom-tabs'
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useEffect} from 'react'
import {$isAvailable} from '../set-available/models'
import {useStore} from 'effector-react'
import {$isNewMessageInChat, setIsAmInChat} from '../../../screens/main-stack-screen/chat/models/models'

const width = Dimensions.get('window').width

export const TabBarPanel = ({state, descriptors, navigation}: BottomTabBarProps) => {
    const focusedOptions = descriptors[state.routes[state.index].key].options
    const isAvailable = useStore($isAvailable)
    const isNewChatMessage = useStore($isNewMessageInChat)

    const chatIndex = state.routeNames.length - 2

    if (focusedOptions.tabBarVisible === false) {
        return null
    }

    useEffect(() => {
        if (state.index === chatIndex) {
            setIsAmInChat(true)
        } else {
            setIsAmInChat(false)
        }
    }, [state.index])

    return (
        <View style={{
            flexDirection: 'row',
            height: 55,
            width: width,
            justifyContent: 'space-around',
            paddingTop: 10,
            paddingBottom: 10,
            borderTopEndRadius: 10,
            borderTopStartRadius: 10,
            backgroundColor: '#ffffff',
            bottom: 7,
        }}>
            {state.routes.map((route, index) => {
                const isDisabled = () => {
                    return index === 1 && !isAvailable
                }

                const {options} = descriptors[route.key]
                const label =
                    options.tabBarLabel !== undefined ?
                        options.tabBarLabel :
                        options.title !== undefined ?
                            options.title :
                            route.name


                const isFocused = state.index === index

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    })

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name)
                    }
                }


                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    })
                }

                const setButtonColor = () => {
                    if (isFocused) {
                        return '#1672D4'
                    }
                    if (!isAvailable && index === 1) {
                        return '#808993'
                    }
                    return '#1F2934'
                }
                const IconComponent = options.tabBarIcon ? options.tabBarIcon({
                    color: setButtonColor(),
                    size: 19,
                    focused: isFocused,
                }) : null

                const badgeIsVisible = () => {
                    if (isNewChatMessage && index === chatIndex) {
                        return true
                    }
                }

                return (
                    <TouchableOpacity
                        key={index}
                        disabled={isDisabled()}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? {selected: true} : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{flex: 1, alignItems: 'center'}}>

                        {badgeIsVisible() &&
                        <Badge/>
                        }

                        {IconComponent}

                        <Text style={{
                            color: setButtonColor(),
                            marginTop: 3,
                            textAlign: 'center',
                            fontSize: 9,
                            lineHeight: 12,
                        }}>
                            {label}
                        </Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

const Badge = () => {
    return (
        <View style={styles.badge}/>

    )
}

const styles = StyleSheet.create({
    badge: {
        backgroundColor: '#1672D4',
        width: 8,
        position: 'absolute',
        height: 8,
        borderRadius: 20,
        transform: [
            {translateY: -2},
            {translateX: 7},
        ],
    },
})
