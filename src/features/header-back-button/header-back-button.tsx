import React from 'react'
import {useNavigation} from '@react-navigation/native'
import {navButtonIndex, setSelectedIndexNavButton} from '../navigation/models/models'
import {TouchableOpacity} from 'react-native'
import {LeftArrow} from '../../ui/atoms/icons/left-arrow'
import {links} from '../../navigation/links'

type backButtonProps = {
    // props: StackHeaderLeftButtonProps
    backTo?: string
}

export const BackButton: React.FC<backButtonProps> = ({backTo}) => {
    const navigation = useNavigation()

    const direction = backTo || links.home

    const onPress = () => {
        if (direction === links.home) {
            setSelectedIndexNavButton(navButtonIndex.home)
        }
        navigation.navigate(direction)
    }

    return (
        <TouchableOpacity onPress={onPress} style={{height: 40, width: 80, justifyContent: 'center', paddingLeft: 19}}>
            <LeftArrow/>
        </TouchableOpacity>
    )
}
