import {TabBarPanel} from '../src/features/navigation/tab-bar-panel'
import {BidsSVG, ChatSVG, LoadSVG, ProfileSVG} from '../src/ui/atoms/icons'
import links from '../links.json'
import {HomeStackScreen} from '../screens/main-stack-screen/home'
import {BidsStackScreen} from '../screens/main-stack-screen/bids/bids'
import {ChatStackScreen} from '../screens/main-stack-screen/chat/chat'
import {ProfileStackScreen} from '../screens/main-stack-screen/profile/profile'
import React, {useEffect} from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {$selfStatus, statuses} from '../hooks'
import {useStore} from 'effector-react'
import {useNavigation} from '@react-navigation/native'
import {$isAvailable} from '../src/features/set-available/models'

const Tab = createBottomTabNavigator()

export const BottomTabNavigationScreen = () => {
    const selfStatus = useStore($selfStatus)
    const isAvailable = useStore($isAvailable)

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
    // <NavigationContainer
    //     theme={colorScheme == 'dark' ? DarkTheme : DefaultTheme}>

    // <StatusBar barStyle="dark-content" backgroundColor={"#fff"}/>
    // </NavigationContainer>
}


// import {Ionicons} from '@expo/vector-icons';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {createStackNavigator} from '@react-navigation/stack';
// import * as React from 'react';
// import {LinearGradient} from 'expo-linear-gradient';
//
// import chat from "../screens/chat";
// import {Profile} from "../screens/Profile";
// import {Main} from "../screens/Main";
//
// const BottomTab = createBottomTabNavigator();
//
// export default function BottomTabNavigator() {
//     // const colorScheme = useColorScheme();
//
//     return (
//         <BottomTab.Navigator
//             initialRouteName="Loads"
//             tabBarOptions={{
//                 activeTintColor: '#4EA2EF',
//                 labelStyle: {fontSize: 14},
//                 inactiveTintColor: '#2B2B2B',
//                 style: {height: 39},
//                 tabStyle:{
//                     alignItems:'center',
//                     justifyContent:'center',
//                     height:39
//                 }
//             }}>
//             <BottomTab.Screen
//                 name="Main"
//                 component={Main}
//                 // options={{
//                 //   tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
//                 // }}
//             />
//             <BottomTab.Screen
//                 name="Bids"
//                 component={chat}
//                 // options={{
//                 //   tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
//                 // }}
//             />
//             <BottomTab.Screen
//                 name="chat"
//                 component={chat}
//                 // options={{
//                 //     tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
//                 // }}
//             />
//             <BottomTab.Screen
//                 name="Profile"
//                 component={Profile}
//                 // options={{
//                 //     tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
//                 // }}
//             />
//         </BottomTab.Navigator>
//     );
// }
//
// // You can explore the built-in icon families and icons on the web at:
// // https://icons.expo.fyi/
// function TabBarIcon(props: { name: string; color: string }) {
//     return <Ionicons size={30} style={{marginBottom: -3}} {...props} />;
// }
//
//
// const TabOneStack = createStackNavigator();
// //
// // function TabOneNavigator() {
// //     return (
// //         <TabOneStack.Navigator>
// //             <TabOneStack.Screen
// //                 name="Loads"
// //                 component={Loads}
// //                 options={{headerTitle: 'Loads'}}
// //             />
// //         </TabOneStack.Navigator>
// //     );
// // }
//
// const TabTwoStack = createStackNavigator();
//
// function TabTwoNavigator() {
//     return (
//         <TabTwoStack.Navigator>
//             <TabTwoStack.Screen
//                 name="Bids"
//                 component={chat}
//                 options={{headerTitle: 'Bids'}}
//             />
//         </TabTwoStack.Navigator>
//     );
// }
//
// const TabChatStack = createStackNavigator();
//
// function TabChatNavigator() {
//     return (
//         <TabTwoStack.Navigator>
//             <TabTwoStack.Screen
//                 name="chat"
//                 component={chat}
//                 options={{headerTitle: 'chat'}}
//             />
//         </TabTwoStack.Navigator>
//     );
// }
//
// const TabProfileStack = createStackNavigator();
//
// function TabProfileNavigator() {
//     return (
//         <TabTwoStack.Navigator>
//             <TabTwoStack.Screen
//                 name="Profile"
//                 component={Profile}
//                 options={{
//                     headerTitle: '',
//                     header: () => {
//                         return (
//                             <LinearGradient colors={['rgba(156, 68, 249,0.5)', 'transparent', 'transparent']}
//                                             start={{x: 1, y: 0}}
//                                             end={{x: 1, y: 1}}
//                                             style={{height: '90%',width:'100%',position:'relative',bottom:1,zIndex:100}}>
//                             </LinearGradient>
//                         )
//                     },
//                     headerStyle: {
//                         backgroundColor: 'red',
//                     },
//
//                 }}
//             />
//         </TabTwoStack.Navigator>
//     );
// }
