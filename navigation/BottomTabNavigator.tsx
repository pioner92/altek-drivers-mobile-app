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
