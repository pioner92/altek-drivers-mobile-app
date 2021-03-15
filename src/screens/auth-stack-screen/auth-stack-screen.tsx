import {Login, Verification} from '../index'
import {SignUp} from './sign-up/sign-up'
import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {StackScreenContainer} from '../stack-screen-container'
import {links} from '../../navigation/links'

const Stack = createStackNavigator()


export const AuthStackScreen = () => {
    return (
        <StackScreenContainer>
            <Stack.Screen name={links.login} component={Login}/>
            <Stack.Screen name={links.verification} component={Verification}/>
            <Stack.Screen name={links.singUp} component={SignUp}/>
        </StackScreenContainer>
    )
}
