import React, {useEffect} from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {getDb} from '../../utils/db/get-db'
import {setUserPhoto} from './models'
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack'
import {styleConfig} from '../../src/StyleConfig'
import {PhotoProfileBlock} from './screens/edit-profile/features/photo-profile-block'
// @ts-ignore
import {PopoverContainer} from 'react-native-simple-popover'
import {initUserData} from './models/models'
import {PHOTOPROFILE} from '../../utils/db/constants'
import links from '../../links.json'
import {ScreenWrapper} from '../../src/ui/atoms/screen-wrapper/screen-wrapper'
import {StackScreenCreator} from '../../src/features/navigation/features/stack-screen-creator/stack-screen-creator'


const Profile: React.FC<StackScreenProps<any>> = ({navigation}) => {
    useEffect(() => {
        initUserData()
        getDb(PHOTOPROFILE)
            .then((data) => data && setUserPhoto(data))
    }, [])


    return (
        <ScreenWrapper enableNavigateButtons={false} style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContainer}>
                <PopoverContainer>
                    <PhotoProfileBlock enableButtonEdit={true}/>
                    {/* <MostRecentLoad/>*/}
                    {/* <Rewards/>*/}
                    {/* <Benefits/>*/}
                    {/* <Account/>*/}
                </PopoverContainer>

            </ScrollView>
        </ScreenWrapper>
    )
}

const Stack = createStackNavigator()

export const ProfileStackScreen = () => StackScreenCreator({link: links.profile, component: Profile, title: 'Profile'})

// export const ProfileStackScreen:React.FC = ()=> {
//
//     return (
//         <Stack.Navigator
//             initialRouteName={links.profile}>
//             <Stack.Screen
//                 name={links.profile}
//                 component={Profile}
//                 options={{
//                     headerTintColor:'#000',
//                     headerStyle:{
//                         backgroundColor:'#fff'
//                     },
//                 }}
//             />
//         </Stack.Navigator>
//     )
// }

const styles = StyleSheet.create({
    container: {},
    scrollContainer: {
        paddingHorizontal: styleConfig.screenPadding,
        paddingBottom: 80,
        paddingTop: 26,
    },

})

