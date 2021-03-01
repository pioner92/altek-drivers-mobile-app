import React from 'react'
import {View} from 'react-native'


type propsType = {
    isSelected: boolean
}

export const SelectedCircle: React.FC<propsType> = ({isSelected}) => {
    return (
        <View style={{
            width: 14,
            height: 14,
            backgroundColor: 'transparent',
            borderRadius: 50,
            borderWidth: 1,
            borderColor: '#FFFFFF',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            {isSelected ?
                <View style={{
                    width: 8,
                    height: 8,
                    backgroundColor: '#FFFFFF',
                    borderRadius: 50,
                }}/> :
                null
            }

        </View>
    )
}
