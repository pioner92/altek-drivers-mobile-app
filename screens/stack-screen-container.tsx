import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

const Stack = createStackNavigator()


export const StackScreenContainer:React.FC = ({children}) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: '#000',
                headerShown: false,
                headerStyle: {
                    backgroundColor: '#fff',
                    borderColor: 'transparent',
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.10,
                    shadowRadius: 1.41,
                    elevation: 2,
                },
            }}>
            {children}
        </Stack.Navigator>
    )
}
