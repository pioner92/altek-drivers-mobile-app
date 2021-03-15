import {TabBarPanel} from '../features/navigation/tab-bar-panel'
import {BidsSVG, ChatSVG, LoadSVG, ProfileSVG} from '../ui/atoms/icons'
import {HomeStackScreen} from '../screens/main-stack-screen/home/home'
import {BidsStackScreen} from '../screens/main-stack-screen/bids/bids'
import {ChatStackScreen} from '../screens/main-stack-screen/chat/chat'
import {ProfileStackScreen} from '../screens/main-stack-screen/profile/profile'
import React, {useEffect} from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {$selfStatus, statuses} from '../../hooks'
import {useStore} from 'effector-react'
import {useNavigation} from '@react-navigation/native'
import {links} from './links'

const Tab = createBottomTabNavigator()

export const BottomTabNavigationScreen = () => {
    const selfStatus = useStore($selfStatus)

    const {navigate} = useNavigation()

    useEffect(() => {
        navigate(links.home)
    }, [])

    return (
        <Tab.Navigator
            tabBar={(props) => <TabBarPanel {...props} keyboardHidesTabBar={true}/>}
            initialRouteName={links.home}
            tabBarOptions={{
                tabStyle: {
                    backgroundColor: '#fff',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                },
                style: {
                    backgroundColor: '#fff',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    bottom: 20,
                },
                allowFontScaling: false,
            }}>
            <Tab.Screen
                options={{
                    tabBarIcon: (info) => LoadSVG({size: 19, color: info.color}),
                }}
                name={links.home} component={HomeStackScreen}/>


            {selfStatus === statuses.waiting &&
            <Tab.Screen
                options={{
                    tabBarIcon: (info) => BidsSVG({size: 19, color: info.color}),
                }}
                name={links.bids} component={BidsStackScreen}/>
            }
            <Tab.Screen
                options={{
                    tabBarIcon: (info) => ChatSVG({size: 19, color: info.color}),
                    tabBarBadge: 2,
                    tabBarBadgeStyle: {
                        color: 'white',
                        backgroundColor: '#1672D4',
                    },
                }}
                name={links.chat} component={ChatStackScreen}/>
            <Tab.Screen
                options={{
                    tabBarIcon: (info) => ProfileSVG({size: 19, color: info.color}),
                }}
                name={links.profile} component={ProfileStackScreen}/>

        </Tab.Navigator>
    )
}
